import { jwtDecode } from "jwt-decode";
import { useEffect, useCallback  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../storage/redux/store";
import { useNavigate } from "react-router-dom";
import { useRefreshTokenMutation } from "../APIs/accountApi";
import toastNotify from "../helpers/toastNotify";
import { emptyUserState, setLoggedInUser, setToken } from "../storage/redux/authSlice";
import User from "../models/User";
import { formatDateTimeComplete } from "./formatDate";

interface DecodedToken {
    exp: number;
}


const isTokenExpired = (token: string): boolean => {
    if (!token) return true;

    try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return true;
    }
};




function TokenRefreshManager  ()  {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [refreshTokenMutation] = useRefreshTokenMutation();
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);
    const userId = useSelector((state: RootState) => state.auth.id);

    const logoutUser = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('loginDateTime');
        dispatch(setLoggedInUser({ ...emptyUserState }));
        navigate("/");
        toastNotify("Your session has expired, please log in again!", "error");
    };


    const checkAndRefreshToken = useCallback(async () => {

        if (isTokenExpired(accessToken) && refreshToken) {
            try {
                console.log("Token expired, attempting to refresh...");

                const response = await refreshTokenMutation(userId);
                console.log("Response from token refresh:", response);

                if ('data' in response) {
                    const { token: newAccessToken } = response.data;

                    // Log the new access token before decoding
                    console.log("New access token received:", newAccessToken);

                    try {
                        const { id, name, lastName, email, role }: User = jwtDecode(newAccessToken);
                        localStorage.setItem("accessToken", newAccessToken);
                        dispatch(setToken({ accessToken: newAccessToken, refreshToken }));
                        dispatch(setLoggedInUser({ id, name, lastName, email, role, accessToken: newAccessToken }));
                        // Set or update loginDateTime on successful login or token refresh
                        const updatedLoginDateTime = formatDateTimeComplete(new Date()) as string;
                        localStorage.setItem("loginDateTime", updatedLoginDateTime);
                        console.log("Tokens updated, new loginDateTime set to:", updatedLoginDateTime);

                    } catch (decodeError) {
                        console.error("Failed to decode new access token:", decodeError);
                    }
                } else if ('error' in response) {
                    console.error("Token refresh error:", response);
                    logoutUser();
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
            }

        } else {
            console.log("Access token is valid or no refresh needed.");
        }
    }, [accessToken, refreshToken, userId, dispatch, navigate, refreshTokenMutation]);



    useEffect(() => {
        if (!accessToken || !refreshToken) {
            console.log("Access token or refresh token is missing. Skipping interval setup.");
            return; // Do not set up interval if tokens are not available
        }

        console.log("Setting up token refresh interval.");

        // Set initial login time if not already set
        let loginDateTime = localStorage.getItem("loginDateTime");
        if (!loginDateTime) {
            loginDateTime = formatDateTimeComplete(new Date()) as string;
            localStorage.setItem("loginDateTime", loginDateTime);
            console.log("Initial login time set to:", loginDateTime);
        } else {
            console.log("Login time already set in localStorage:", loginDateTime);
        }

        // Set up the token refresh interval
        const intervalId = setInterval(() => {
            console.log("Token refresh interval triggered.");
            checkAndRefreshToken();
        }, 300000); // Every 5 minutes

        // Start an initial timeout to delay the first token refresh
        const timeoutId = setTimeout(() => {
            console.log("Initial timeout completed, starting token refresh.");
            checkAndRefreshToken(); // Initial check
        }, 300000); // Wait for 5 minutes before the first refresh

        // Cleanup function to clear the interval and timeout
        return () => {
            console.log("Cleaning up timeout and interval.");
            clearTimeout(timeoutId); // Clear the initial timeout
            clearInterval(intervalId); // Clear the refresh interval
            console.log("Timeout and interval cleared.");
        };

    }, [accessToken, refreshToken, checkAndRefreshToken]);

    // Effect to update loginDateTime whenever tokens are updated
    useEffect(() => {
        if (accessToken && refreshToken) {
            const formattedLoginDateTime = formatDateTimeComplete(new Date()) as string; // Format the current time
            localStorage.setItem("loginDateTime", formattedLoginDateTime);
            console.log("Tokens updated, new loginDateTime set to:", formattedLoginDateTime);
        }
    }, [accessToken, refreshToken]);

    return null;

};

export default TokenRefreshManager;
