export default interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    role?: string;
    jwtToken?: string;
};