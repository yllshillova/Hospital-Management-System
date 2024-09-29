import { jwtDecode } from "jwt-decode";
import { useEffect, useCallback } from "react";
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
    let logoutTimeoutId: number | null = null;

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
    }, [accessToken, refreshToken, userId, refreshTokenMutation]);



    const setLogoutTimeout = (expiryDateTime: string) => {
        const expiryDate = new Date(expiryDateTime);
        const currentDate = new Date();
        const timeUntilLogout = expiryDate.getTime() - currentDate.getTime();

        // Clear any existing timeout
        if (logoutTimeoutId !== null) {
            clearTimeout(logoutTimeoutId);
        }

        if (timeUntilLogout <= 0) {
            console.log("Refresh token has expired, logging out...");
            logoutUser();
        } else {
            console.log(`Setting logout timeout for ${timeUntilLogout} milliseconds.`);
            logoutTimeoutId = window.setTimeout(() => {
                console.log("Logging out due to refresh token expiry...");
                logoutUser();
            }, timeUntilLogout);
        }
    };

    useEffect(() => {
        if (!refreshToken) {
            console.log("Refresh token is missing. Skipping setup.");
            return; // Do not set up if refresh token is not available
        }

        // Retrieve the refresh token expiry date from local storage
        const refreshTokenExpiry = localStorage.getItem("refreshTokenExpiry");
        if (refreshTokenExpiry) {
            setLogoutTimeout(refreshTokenExpiry); // Set logout timeout based on expiry
        }

        console.log("Setting up token refresh check.");
        const intervalId = setInterval(() => {
            console.log("Checking access token status.");
            checkAndRefreshToken();
        }, 300000); // Check every 5 minutes

        // Cleanup function to clear the interval and timeout
        return () => {
            console.log("Cleaning up interval and timeout.");
            clearInterval(intervalId); // Clear the refresh interval
            if (logoutTimeoutId !== null) {
                clearTimeout(logoutTimeoutId); // Clear the timeout if it exists
            }
        };
    }, [checkAndRefreshToken, refreshToken]); // Removed accessToken from dependencies


    // kqyre a po dhez pa access tokenin n dependency edhe me qet logout timeout id

    return null;

};

export default TokenRefreshManager;
