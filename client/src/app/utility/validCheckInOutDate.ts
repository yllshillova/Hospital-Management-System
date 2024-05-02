export function validCheckInOutDate(date: Date): string | undefined {
    // Check if the input is a valid Date object
    if (date instanceof Date && !isNaN(date.getDate())) {
        // Adjust for local timezone offset
        const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

        // Format the date according to ISO 8601 standard (YYYY-MM-DDTHH:mm:ss)
        const formattedDateTime = localDateTime.toISOString().slice(0, 19); // Extract YYYY-MM-DDTHH:mm:ss part

        // Return the formatted date-time string
        return formattedDateTime;
    }
    return undefined;
}
