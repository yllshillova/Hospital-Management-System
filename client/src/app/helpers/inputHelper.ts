import React from "react";

const inputHelper = (
    e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    data: any
) => {
    const tempData: any = { ...data };

    // Check if it's a datetime-local input
    if (e.target.type === "datetime-local") {
        // Convert the datetime-local string to a JavaScript Date object
        const selectedDateTime = new Date(e.target.value);

        // Adjust for local timezone offset
        const localDateTime = new Date(selectedDateTime.getTime() - selectedDateTime.getTimezoneOffset() * 60000);

        // Format the date according to ISO 8601 standard (YYYY-MM-DDTHH:mm:ss)
        const formattedDateTime = localDateTime.toISOString().slice(0, 19); // Extract YYYY-MM-DDTHH:mm:ss part

        tempData[e.target.name] = formattedDateTime;
    } else {
        // For other input types, simply update the state with the input value
        tempData[e.target.name] = e.target.value;
    }

    return tempData;
};

export default inputHelper;
