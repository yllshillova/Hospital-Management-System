//export function validCheckInOutDate(dateString: string | Date): string | undefined {
//    if (dateString) {
//        const date = new Date(dateString);

//        if (!isNaN(date.getTime())) {
//            return date.toISOString().split('T')[0];
//        }
//    }
//    return undefined;
//}

export function validCheckInOutDate(dateString: string | Date): string | undefined {
    if (dateString instanceof Date) {
        const date = dateString;

        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }
    } else if (typeof dateString === 'string') {
        const date = new Date(dateString);

        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }
    }
    return undefined;
}
