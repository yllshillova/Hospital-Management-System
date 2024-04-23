//import Patient from "./Patient";

import RoomPatient from "./RoomPatient";

export default interface Room {
    id: number;
    capacity: number;
    isFree: boolean;
    //patientId: number;
    //patient: Patient;
    //patientName: string;
    createdAt: Date;
    updatedAt: Date;
    nrDhomes: number;
    roomPatients: RoomPatient[];
}