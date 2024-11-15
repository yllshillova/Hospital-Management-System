export default interface Nurse {
    id: string;
    name: string;
    lastName: string;
    userName: string;
    email: string;
    residence: string;
    address: string;
    gender: string;
    birthday: Date;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    departmentId: string;
    password: string;
}

