import StaffMember from "./StaffMember";

export default interface Department {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    staff: StaffMember[];
}



