import Doctor from "./Doctor";
import Patient from "./Patient";

export default interface Appointment {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    checkInDate: Date;
    checkOutDate: Date;
    status: string;
    reason: string;
    notes: string;
    doctorId: number;
    doctor: Doctor;
    patientId: number;
    patient: Patient;
}
