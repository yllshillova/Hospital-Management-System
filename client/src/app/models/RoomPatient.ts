import Patient from "./Patient";
import Room from "./Room";

export default interface RoomPatient {
    patientId: string;
    patient: Patient;
    roomId: string;
    room: Room;

}