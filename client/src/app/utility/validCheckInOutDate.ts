//export function validCheckInOutDate(dateString: string | Date): string | undefined {
//    if (dateString) {
//        const date = new Date(dateString);

//        if (!isNaN(date.getTime())) {
//            return date.toISOString().split('T')[0];
//        }
//    }
//    return undefined;
//}

export function validCheckInOutDate(date: Date): string | undefined {
    // Check if the input is a valid Date object
    if (date instanceof Date && !isNaN(date.getTime())) {
        // Format the date according to ISO 8601 standard (YYYY-MM-DDTHH:mm:ss)
        const formattedDateTime = date.toISOString().slice(0, 19); // Extract YYYY-MM-DDTHH:mm:ss part
        // Return the formatted date-time string
        return formattedDateTime;
    }
    return undefined;
}
