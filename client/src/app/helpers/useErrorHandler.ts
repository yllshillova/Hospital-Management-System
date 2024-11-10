import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NavigateFunction } from "react-router-dom";
import toastNotify from "./toastNotify";
import { SerializedError } from "@reduxjs/toolkit";

type CustomErrorData = {
    message?: string;
    errors?: { [key: string]: string[] };
};

export default function useErrorHandler(
    error: FetchBaseQueryError | SerializedError,
    navigate: NavigateFunction,
    currentLocation: string,
    setErrorMessages?: React.Dispatch<React.SetStateAction<string[]>>
) {
    if (!error) {
        toastNotify("An unexpected error occurred", "error");
        return;
    }

    if ("status" in error) {
        const { status, data } = error as FetchBaseQueryError;

        let errorMessage: string[] = [];

        if (data && typeof data === 'object') {
            const customErrorData = data as CustomErrorData;

            if (customErrorData.errors) {
                const errors = customErrorData.errors;
                console.log(errors);
                errorMessage = Object.values(errors).flat();
            } else if (customErrorData.message) {
                errorMessage = [customErrorData.message];
            }
        } else if (typeof data === 'string') {
            errorMessage = [data];
        }

        if (setErrorMessages) {
            console.log(errorMessage);
            setErrorMessages(errorMessage);
            return;
        }

        switch (status) {
            case 400:
                toastNotify("Bad Request", "error");
                break;
            case 401:
                toastNotify("Unauthorized", "error");
                break;
            case 403:
                toastNotify("Forbidden", "error");
                break;
            case 404:
                navigate('/not-found');
                return;
            case 500:
                toastNotify("Internal Server Error", "error");
                break;
            case 'PARSING_ERROR':
                toastNotify(data, "error");
                break;
            default:
                toastNotify("An unexpected error occurred", "error");
                navigate('/Dashboard');
                return;
        }

        navigate(currentLocation);

    } else if ("message" in error) {
        const { message } = error as SerializedError;
        toastNotify(message ?? "An unexpected error occurred", "error");
        navigate(currentLocation);
    } else {
        toastNotify("An unexpected error occurred", "error");
        navigate('/Dashboard');
    }
}
