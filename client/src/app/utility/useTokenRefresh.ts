import { jwtDecode } from "jwt-decode";
import { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../storage/redux/store";
import { useNavigate } from "react-router-dom";
import { useRefreshTokenMutation } from "../APIs/accountApi";
import toastNotify from "../helpers/toastNotify";
import { clearToken, emptyUserState, setLoggedInUser, setToken } from "../storage/redux/authSlice";
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


    const [logoutTimeoutId, setLogoutTimeoutId] = useState<number | null>(null);
    const intervalRef = useRef<number | null>(null);

    const logoutUser = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('loginDateTime');
        localStorage.removeItem('refreshTokenExpiry');

        dispatch(setLoggedInUser({ ...emptyUserState }));
        dispatch(clearToken());

        console.log("Access token after logout:", localStorage.getItem('accessToken'));
        console.log("Refresh token after logout:", localStorage.getItem('refreshToken'));
        navigate("/");
        toastNotify("Your session has expired, please log in again!", "error");
    };


    const checkAndRefreshToken = useCallback(async () => {
        console.log("Current accessToken:", accessToken);
        console.log("Current refreshToken:", refreshToken);

        //// If either token is missing, do not attempt refresh
        //if (!userId || !accessToken || !refreshToken) {
        //    console.log("User is logged out. Skipping token check.");
        //    return; // Skip token check if user is not logged in
        //}


        if (isTokenExpired(accessToken)) {


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
    }, [refreshToken, accessToken, userId]);



    const setLogoutTimeout = (expiryDateTime: string) => {
        const expiryDate = new Date(expiryDateTime);
        const currentDate = new Date();
        const timeUntilLogout = expiryDate.getTime() - currentDate.getTime();

        // Clear any existing timeout using functional update
        setLogoutTimeoutId(prevId => {
            if (prevId !== null) {
                clearTimeout(prevId); // Clear the previous timeout
            }

            if (timeUntilLogout <= 0) {
                console.log("Refresh token has expired, logging out...");
                logoutUser();
                return null; // No new timeout to set
            } else {
                console.log(`Setting logout timeout for ${timeUntilLogout} milliseconds.`);
                const id = window.setTimeout(() => {
                    console.log("Logging out due to refresh token expiry...");
                    logoutUser();
                }, timeUntilLogout);
                return id; // Return new timeout ID
            }
        });
    };

    useEffect(() => {
        if (!accessToken) {
            console.log("User is logged out. Skipping token refresh setup.");
            return; // Skip setting up the interval and timeout if the user is logged out
        }


        // Retrieve the refresh token expiry date from local storage
        const refreshTokenExpiry = localStorage.getItem("refreshTokenExpiry");
        if (refreshTokenExpiry) {
            setLogoutTimeout(refreshTokenExpiry); // Set logout timeout based on expiry
        }

        console.log("Setting up token refresh check.");
        intervalRef.current = window.setInterval(() => {
            console.log("Checking access token status.");
            checkAndRefreshToken();
        }, 1800000); // Check every 5 minutes

        return () => {
            console.log("Cleaning up interval and timeout.");
            console.log(`Current intervalId before clearing: ${intervalRef.current}`);
            console.log(`Current logoutTimeoutId before clearing: ${logoutTimeoutId}`);

            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current); // Clear the refresh interval
                console.log("Refresh interval cleared.");
                intervalRef.current = null; // Set to null after clearing
            }

            if (logoutTimeoutId !== null) {
                clearTimeout(logoutTimeoutId);
                console.log("Logout timeout cleared.");
                setLogoutTimeoutId(null); // Set to null after clearing
            } else {
                console.log("No logout timeout to clear.");
            }

            console.log(`Current intervalId after clearing: ${intervalRef.current}`);
            console.log(`Current logoutTimeoutId after clearing: ${logoutTimeoutId}`);
        };
    }, [checkAndRefreshToken, accessToken]); 



    return null;

};

export default TokenRefreshManager;
