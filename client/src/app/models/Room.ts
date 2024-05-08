import Department from "./Department";
import Patient from "./Patient";

export default interface Room {
    id: string;
    beds: number;
    bedsAvailable: number;
    //isFree: boolean;
    createdAt: Date;
    updatedAt: Date;
    roomNumber: number;
    patients: Patient[];
    department: Department;
    departmentId: string;
}