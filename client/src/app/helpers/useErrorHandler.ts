import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NavigateFunction } from "react-router-dom";
import toastNotify from "./toastNotify";

function useErrorHandler(error: FetchBaseQueryError, navigate: NavigateFunction, currentLocation: string) {
    if (!error) {
        toastNotify("An unexpected error occurred", "error");
        return;
    }

    const { status, data } = error;

    if (status) {
        switch (status) {
            case 400:
                toastNotify("Bad Request", "error");
                navigate(currentLocation);
                return;
            case 401:
                toastNotify("Unauthorized", "error");
                navigate(currentLocation);
                return;
            case 403:
                toastNotify("Forbidden", "error");
                navigate(currentLocation);
                return;
            case 404:
                navigate('/not-found');
                return;
            case 500:
                navigate(currentLocation);
                return;
            case 'PARSING_ERROR':
                toastNotify(data, "error");
                navigate(currentLocation);
                return;
            default:
                toastNotify("An unexpected error occurred", "error");
                navigate('/');
                return;
        }
    } else {
        toastNotify("An unexpected error occurred", "error");
        navigate('/');
        return;
    }
}

export default useErrorHandler;