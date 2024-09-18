import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faAdd, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useGetMoviesQuery } from "../../app/APIs/movieApi";
import Movie from "../../app/models/Movie";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { useGetReviewsQuery } from "../../app/APIs/reviewApi";
import Review from "../../app/models/Review";
import { useEffect, useState } from "react";

function MovieList() {

    const { data, isLoading, error } = useGetMoviesQuery(null);
    const { data: reviewsData, isLoading: reviewsLoading, error: reviewsError } = useGetReviewsQuery(null);
    const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
    const navigate = useNavigate();

    

    useEffect(() => {

        if (data && reviewsData) {
            const filteredMovies = data.filter((movie: Movie) => {
                return reviewsData.some((review: Review) => review.movieId === movie.id && review.rating < 9 && review.rating >6);

            });
            console.log(filteredMovies);
            setDisplayedMovies(filteredMovies);

        }


    }, [data, reviewsData]);

    let content;


    if (isLoading || reviewsLoading) {

        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    }

    else if (error && reviewsError) {

        const fetchError = error as FetchBaseQueryError;
        const errorMessage = fetchError?.data as string;
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("Movies")} </ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/movie/insert")}>Insert a Movie </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }

    else {
        content = displayedMovies.map((movie: Movie) => {
            return (
                <tbody key={movie.id}>
                    <TableRow>
                        <TableCell>{movie.title}</TableCell>
                        <TableCell>{movie.genre}</TableCell>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/movie/update/" + movie.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                    </TableRow>
                </tbody>
            );
        });

        content = (
            <>
                <Header />
                <SidePanel />
                <OrdersTable>
                    <TableNav>
                        <TableHeader>Movie List</TableHeader>
                        <AddButton onClick={() => navigate("/movie/insert")}  >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell> Title</TableHeaderCell>
                                <TableHeaderCell> Genre</TableHeaderCell>
                            </TableHead>
                        </thead>
                        {content}
                    </Table>
                </OrdersTable>
            </>
        );
    }
    return content;
}
export default MovieList;