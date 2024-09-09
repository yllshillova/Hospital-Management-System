import Planet from "./Planet";

export default interface Satellite {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    isDeleted: boolean;
    planet: Planet;
    planetId: string;
}