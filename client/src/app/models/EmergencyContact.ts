import Patient from "./Patient";
export default interface EmergencyContact {
    id: string;
    contactName: string;
    relation: string;
    phoneNumber: string;
    patientId: string;
    patient: Patient;
    createdAt: Date;
    updatedAt: Date;
   
}