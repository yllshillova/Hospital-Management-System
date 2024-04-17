import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NavigateFunction } from "react-router-dom";
import toastNotify from "./toastNotify";

function useErrorHandler(error: FetchBaseQueryError, navigate: NavigateFunction) {
    if (!error) {
        toastNotify("An unexpected error occurred", "error");
        return;
    }

    if (error.status) {
        switch (error.status) {
            case 400:
                toastNotify("Bad Request", "error");
                navigate('/');
                return;
            case 404:
                navigate('/not-found');
                return;
            case 'PARSING_ERROR':
                toastNotify(error.data, "error");
                navigate('/');
                return;
            default:
                toastNotify("An unexpected error occurred", "error");
                return;
        }
    } else {
        toastNotify("An unexpected error occurred", "error");
        return;
    }
}

export default useErrorHandler;