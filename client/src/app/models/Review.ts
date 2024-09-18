import Movie from "./Movie";

export default interface Review {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userName: string;
    rating: number;
    movie: Movie;
    movieId: string;
}