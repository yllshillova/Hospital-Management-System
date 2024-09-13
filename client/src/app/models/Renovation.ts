import Building from "./Building";

export default interface Renovation {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    cost : number;
    buildingID: string;
    building: Building;
}