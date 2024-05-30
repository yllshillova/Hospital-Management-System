export function validCheckInOutDate(dateString: string): string | undefined {
    // Check if the input is a non-empty string
    if (typeof dateString === 'string' && dateString.trim() !== '') {
        try {
            // Create a new Date object from the input string
            const date = new Date(dateString);

            // Check if the date is valid
            if (!isNaN(date.getTime())) {
                // Format the date according to ISO 8601 standard (YYYY-MM-DDTHH:mm:ss)
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

                // Return the formatted date-time string
                return formattedDateTime;
            }
        } catch (error) {
            // If there's an error parsing the date, return undefined
            return undefined;
        }
    }

    // If the input is empty or invalid, return undefined
    return undefined;
}