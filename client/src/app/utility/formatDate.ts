export function formatDate(birthday: string | Date): string | undefined {
    if (birthday) {
        const date = new Date(birthday);
        if (!isNaN(date.getTime())) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString(); // Get the last two digits of the year

            // Return date formatted as DD-MM-YY
            return `${day}-${month}-${year}`;
        }
    }
    return undefined;
}

export function formatDateTimeLocal(dateTime: string | Date): string | undefined {
    if (dateTime) {
        const date = new Date(dateTime);
        if (!isNaN(date.getTime())) {
            // Adjust for local timezone offset
            const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

            // Format the date according to ISO 8601 standard (YYYY-MM-DDTHH:mm)
            const formattedDateTime = localDateTime.toISOString().slice(0, 16); // Extract YYYY-MM-DDTHH:mm part

            return formattedDateTime;
        }
    }
    return undefined;
}



export const formatDateGeneral = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-CA', { // Using 'en-CA' as it returns date in 'YYYY-MM-DD' format
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(date);
};


export const formatDateTimeComplete = (dateTime: string | Date): string | undefined => {
    if (dateTime) {
        const date = new Date(dateTime);
        if (!isNaN(date.getTime())) {
            // Extract date and time components directly
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            // Return date-time formatted as DD/MM/YYYY HH:mm:ss
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }
    }
    return undefined;
};
const testDateTime = new Date(); // This should reflect your current local time
console.log(formatDateTimeComplete(testDateTime)); // Should match your system time