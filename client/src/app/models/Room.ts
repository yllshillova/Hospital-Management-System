import Patient from "./Patient";

export default interface Room {
    id: number;
    capacity: number;
    isFree: boolean;
    patientId: number;
    patient: Patient;
    //patientName: string;
    createdAt: Date;
    updatedAt: Date;
}