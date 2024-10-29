import Botuesi from "./Botuesi";

export default interface Revista {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    magazineName: string;
    issueNumber: number;

    botuesi: Botuesi;
    publisherId: string;
}