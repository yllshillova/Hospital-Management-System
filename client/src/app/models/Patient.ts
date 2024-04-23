import RoomPatient from "./RoomPatient";

 export default interface Patient{
     id: number;
     name: string;
     lastName: string;
     parentName: string;
     personalNumber: string;
     address: string;
     residence: string;
     birthday: Date;
     bloodgroup: string;
     gender: string;
     email: string;
     phoneNumber: string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     occupation: string;
     allergies: string;
     roomPatients: RoomPatient[];
}