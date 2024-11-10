
 export default interface Patient{
     id: string;
     name: string;
     lastName: string;
     parentName: string;
     personalNumber: string;
     address: string;
     residence: string;
     birthday: Date;
     bloodGroup: string;
     gender: string;
     email: string;
     phoneNumber: string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     occupation: string;
     allergies: string;
}