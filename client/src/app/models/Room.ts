//import Patient from "./Patient";

import Patient from "./Patient";


export default interface Room {
    id: number;
    capacity: number;
    isFree: boolean;
    createdAt: Date;
    updatedAt: Date;
    number: number;
    patients: Patient[];
}