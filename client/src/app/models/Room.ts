import Patient from "./Patient";

export default interface Room {
    id: string;
    beds: string ;
    bedsAvailable: string;
    //isFree: boolean;
    createdAt: Date;
    updatedAt: Date;
    roomNumber: string ;
    patients: Patient[];
    departmentId: string;
}