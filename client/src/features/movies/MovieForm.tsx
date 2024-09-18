/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer ,SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Movie from '../../app/models/Movie';
import { useCreateMovieMutation, useUpdateMovieMutation } from '../../app/APIs/movieApi';

interface MovieFormProps {
    id?: string;
    data?: Movie;
}

const movieData: Movie = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "",
    genre: "",
};

function MovieForm({ id, data }:  MovieFormProps) {

    const [movieInputs, setmovieInputs] = useState<Movie>(data || movieData);
    const [createMovie] = useCreateMovieMutation();
    const [updateMovie] = useUpdateMovieMutation();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 


    


    const handleMovieInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const tempData = inputHelper(e, movieInputs);
        setmovieInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Title", movieInputs.title);
        formData.append("Genre", movieInputs.genre);

              

        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);

            const response = await updateMovie({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Movie has been updated ", "success");
                navigate('/movies');
            }
        } else {
            const response = await createMovie(formData);

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Movie has been created", "success");
                navigate('/movies');
            }
        }                       

        setLoading(false);
    };

   

    let content;

        content = (
            <>
                <Header />
                <SidePanel />
                <OuterContainer>
                    <Container>
                        <FormContainer >
                            {loading && <MainLoader />}
                            <Title>
                                {id ? "Edit Movie" : "Add Movie"}
                            </Title>

                            {/* Display error messages */}
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
                                    <Label>Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value={movieInputs.title}
                                        onChange={handleMovieInput}
                                    />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label>Genre</Label>
                                    <Input
                                        type="text"
                                        name="genre"
                                        value={movieInputs.genre}
                                        onChange={handleMovieInput}
                                    />
                                </FormGroup>

                               
                                <ButtonsContainer>
                                    <SubmitButton type="submit">
                                        Submit
                                    </SubmitButton>
                                    <BackToProductsButton onClick={() => navigate("/movies")}>
                                        Back to Movies
                                    </BackToProductsButton>
                                </ButtonsContainer>
                            </Form>
                        </FormContainer>
                    </Container>
                </OuterContainer>
            </>
        );
        return content;
    }

export default MovieForm;
