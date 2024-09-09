/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import {SD_Roles } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import withAuthorization from '../../app/hoc/withAuthorization';
import book from '../../app/models/Book';
import Author from '../../app/models/Author';
import { useCreateBookMutation, useUpdateBookMutation } from '../../app/APIs/bookApi';
import { useGetAuthorsQuery } from '../../app/APIs/authorApi';

interface BookFormProps {
    id?: string;
    data?: book;
}

const bookData: book = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    genre: "",
    title:"",
    authorId: "",
    author: {} as Author
};

function BookForm({ id, data }: BookFormProps) { 
    const [bookInputs, setBookInputs] = useState<book>(data || bookData);
    const [createBook] = useCreateBookMutation();
    const [updateBook] = useUpdateBookMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
   
    const { data: authorsData, isLoading: authorsLoading, error: authorsError } = useGetAuthorsQuery(null);



    const handleBookInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, bookInputs);
        setBookInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("Genre", bookInputs.genre);
        formData.append("AuthorId", bookInputs.authorId);
        formData.append("Title", bookInputs.title);


        const currentLocation = window.location.pathname; 

        if (id) {
            formData.append("Id", id);
            const response = await updateBook({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Book has been updated", "success");
                navigate('/books');
            }
        } else {
            const response = await createBook(formData);

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("B has been created", "success");
                navigate('/books');
            }
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
                            {id ? "Edit Book" : "Add Book"}
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
                                <Select
                                    name="authorId"
                                    value={bookInputs.authorId}
                                    onChange={handleBookInput}
                                    disabled={authorsLoading}
                                >
                                    <option value="">Select an author</option>
                                    {authorsData?.map((author: Author) => (
                                        <option key={author.id} value={author.id}>
                                            {author.name}
                                        </option>
                                    ))}
                                </Select>
                                {authorsError && <div style={{ color: 'red' }}>Error loading authors</div>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={bookInputs.title}
                                    onChange={handleBookInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Genre</Label>
                                <Input
                                    type="text"
                                    name="genre"
                                    value={bookInputs.genre}
                                    onChange={handleBookInput}
                                />
                            </FormGroup>

                            


                            

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/books")}>
                                    Back to Books
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default withAuthorization(BookForm, [SD_Roles.ADMINISTRATOR]);
