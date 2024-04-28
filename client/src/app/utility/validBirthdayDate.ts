export function validBirthdayDate(birthday: string | Date): string | undefined {
    if (birthday) {
        const date = new Date(birthday);

        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }
    }
    return undefined;
}