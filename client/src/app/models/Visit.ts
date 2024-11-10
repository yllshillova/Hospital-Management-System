import Doctor from "./Doctor";
import Patient from "./Patient";

export default interface Vist {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    complaints: string;
    examinations: string;
    diagnosis: string;
    therapy: string;
    requiredAnalysis: string;
    advice: string;
    remarks: string;
    doctorId: string;
    doctor: Doctor;
    patientId: string;
    patient: Patient;

}
