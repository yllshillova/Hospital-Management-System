import Author from "./Author";

export default interface Book {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    genre: string;
    authorId: string;
    author: Author;
}