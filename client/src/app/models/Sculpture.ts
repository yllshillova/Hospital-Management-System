
import Sculptor from "./Sculptor";

export default interface Sculpture {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    material: string;

    isDeleted: boolean;
    sculptor: Sculptor;
    sculptorId: string;
}