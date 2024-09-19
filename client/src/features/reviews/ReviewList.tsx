/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon,  BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import {  useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { faExclamationCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import { useEffect, useState } from "react";
import {  UserNotFoundMessage } from "../../app/common/styledComponents/chat";
import { useDeleteReviewMutation, useGetReviewsQuery } from "../../app/APIs/reviewApi";
import Review from "../../app/models/Review";
import Movie from "../../app/models/Movie";
import toastNotify from "../../app/helpers/toastNotify";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useGetMoviesQuery } from "../../app/APIs/movieApi";
import { Select } from "../../app/common/styledComponents/upsert";

function ReviewList() {
    const { data, isLoading, error } = useGetReviewsQuery(null);
    const { data: moviesData, isLoading: moviesLoading, error: moviesError } = useGetMoviesQuery(null);
    const [deleteReview] = useDeleteReviewMutation();

    const navigate = useNavigate();
    const [selectedMovie, setSelectedMovie] = useState<string>('');


    const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
    const [ReviewNotFound, setReviewNotFound] = useState(false);

    const findMovieById = (movieId: string) => {
        return moviesData?.find((movie: Movie) => movie.id === movieId);
    };
    useEffect(() => {

        if (data) {

            let filteredReviews = data;
            if (selectedMovie !== '') {
                filteredReviews = filteredReviews.filter(
                    (review: Review) => findMovieById(review.movieId).genre === selectedMovie
                );
            }
            setDisplayedReviews(filteredReviews);
            setReviewNotFound(filteredReviews.length === 0);
        }
    }, [selectedMovie, data]);


    const handleMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMovie(e.target.value);
    };

    const handleReviewDelete = async (id: string) => {
        const result = await deleteReview(id);

        if ('data' in result) {
            toastNotify("Review has been deleted ", "success");
        }
        else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }

    };
    

    let content;

    if (isLoading || moviesLoading) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    } else if (error || moviesError) {
        const fetchError = (error as FetchBaseQueryError) || (moviesError as FetchBaseQueryError);
        const errorMessage = fetchError?.data as string;
        console.log(errorMessage)
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("Reviews")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage  ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                                onClick={() => navigate("/review/insert")}>Insert a Review </BackButton>

                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {
        if (displayedReviews.length > 0) {
            content = (
                displayedReviews.map((review: Review) => {
                    const movie = findMovieById(review.movieId);
                    return (
                        <tbody key={review.id}>
                            <TableRow>
                                <TableCell>{review.userName}</TableCell>
                                <TableCell>{review.rating.toString()}</TableCell>

                                <TableCell>{movie?.title}</TableCell>
                                <TableCell>{movie?.genre}</TableCell>

                                
                                        
                                    <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleReviewDelete(review.id) }>
                                       <FontAwesomeIcon icon={faTrashAlt} />
                                    </ActionButton>
                            </TableRow>
                        </tbody>
                    );
                })
            )
        }
        

        content = (
            <>
                        <Header />
                        <SidePanel />
                        <OrdersTable>
                            <TableNav>
                                <TableHeader>Review List</TableHeader>
                        <Select
                            value={selectedMovie}
                            onChange={handleMovieChange}>
                            <option value="">All Movies</option>
                            {moviesData?.map((movie: Movie) => (
                                <option key={movie.id} value={movie.genre}>
                                    {movie.genre}
                                </option>
                            ))}
                        </Select>
                                        <AddButton onClick={() => navigate("/review/insert")}>
                                            <FontAwesomeIcon icon={faAdd} />
                                        </AddButton>
                            </TableNav>
                            <Table>
                                <thead>
                                    <TableHead>
                                        <TableHeaderCell>User Name</TableHeaderCell>
                                        <TableHeaderCell>Rating</TableHeaderCell>
                                <TableHeaderCell>Movie Title </TableHeaderCell>
                                <TableHeaderCell>Movie Genre </TableHeaderCell>

                                    </TableHead>
                                </thead>
                        {content}
                        {ReviewNotFound && 
                            <UserNotFoundMessage>Review not found</UserNotFoundMessage>}
                            </Table>
                        </OrdersTable>     
            </>
        );
    }
    return content;
}
export default ReviewList;