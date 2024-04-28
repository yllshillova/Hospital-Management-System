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

export const formatDateGeneral = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-CA', { // Using 'en-CA' as it returns date in 'YYYY-MM-DD' format
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(date);
};
