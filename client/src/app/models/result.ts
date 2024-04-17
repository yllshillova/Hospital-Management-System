/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface Result {
    data?: {
        statusCode?: number;
        isSuccess?: boolean;
        errorMessages?: Array<string>;
        result: {
            [key: string]: string;
        };
    };
    error?: any;
}