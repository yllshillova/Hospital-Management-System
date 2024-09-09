export default interface Planet {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    type: string;
    isDeleted: boolean;
}