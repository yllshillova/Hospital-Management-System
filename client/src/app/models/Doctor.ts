export default interface Doctor {
    id: number;
    name: string;
    lastName: string;
    specialization: string;
    email: string;
    residence: string;
    address: string;
    gender: string;
    birthday: Date;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    departmentId: number;
}