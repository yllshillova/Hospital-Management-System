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
