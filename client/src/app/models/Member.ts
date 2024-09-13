import Group from "./Group";


export default interface Member {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    role: string;

    group: Group;
    groupId: string;
}