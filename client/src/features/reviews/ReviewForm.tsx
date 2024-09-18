/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Review from '../../app/models/Review';
import { useCreateReviewMutation } from '../../app/APIs/reviewApi';
import Movie from '../../app/models/Movie';
import { useGetMoviesQuery } from '../../app/APIs/movieApi';

interface ReviewFormProps {
    data?: Review;
}

const reviewData: Review = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    userName: "",
    rating:0,
    movieId: "",
    movie: {} as Movie
};



function ReviewForm({ data }: ReviewFormProps) { 
    const [reviewInputs, setreviewInputs] = useState<Review>(data || reviewData);
    const [createReview] = useCreateReviewMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
   
    const { data : moviesData, isLoading : moviesLoading, error : moviesError } = useGetMoviesQuery(null);



    const handleReviewInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, reviewInputs);
        setreviewInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("UserName", reviewInputs.userName);
        formData.append("Rating", reviewInputs.rating.toString());

        formData.append("MovieId", reviewInputs.movieId);

        const currentLocation = window.location.pathname; 

        
        const response = await createReview(formData);

        if ('error' in response) {
            useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
        } else {
            toastNotify("Review has been created", "success");
            navigate('/reviews');
        }            

        setLoading(false);
    };

    

    return (
        <>
            <Header />
            <SidePanel />
            <OuterContainer>
                <Container>
                    <FormContainer >
                        {loading && <MainLoader />}
                        <Title>
                            Add Review
                        </Title>

                        {errorMessages.length > 0 && (
                            <div style={{ color: 'red' }}>
                                <ul>
                                    {errorMessages.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Form
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <FormGroup>
                                <Label>User Name</Label>
                                <Input
                                    type="text"
                                    name="userName"
                                    value={reviewInputs.userName}
                                    onChange={handleReviewInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Rating</Label>
                                <Input
                                    type="number"
                                    name="rating"
                                    value={reviewInputs.rating}
                                    onChange={handleReviewInput}
                                />
                            </FormGroup>


                            <FormGroup>
                                <Select
                                    name="movieId"
                                    value={reviewInputs.movieId}
                                    onChange={handleReviewInput}
                                    disabled={moviesLoading}
                                >
                                    <option value="">Select Movie</option>
                                    {moviesData && moviesData.map((movie: Movie) => (
                                        <option key={movie.id} value={movie.id}>
                                            {movie.title}
                                        </option>
                                    ))}
                                </Select>
                                {moviesError && <div style={{ color: 'red' }}>Error loading Movies</div>}
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/reviews")}>
                                    Back to Reviews
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default ReviewForm;
