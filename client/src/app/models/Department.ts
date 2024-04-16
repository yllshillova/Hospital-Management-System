export default interface Patient {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}