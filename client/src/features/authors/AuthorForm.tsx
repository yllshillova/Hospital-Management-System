/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import {  BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer ,SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { SD_Roles } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import withAuthorization from "../../app/hoc/withAuthorization";
import Author from '../../app/models/Author';
import { validBirthdayDate } from '../../app/utility/validBirthdayDate';
import { useCreateAuthorMutation } from '../../app/APIs/authorApi';

interface AuthorFormProps {
    data?: Author;
}

const authorData: Author = {
    name: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    country: "",
    birthDate: new Date,
};

function AuthorForm({ data }: AuthorFormProps) {

    const [authorInputs, setauthorInputs] = useState<Author>(data || authorData);
    const [createAuthor] = useCreateAuthorMutation();
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 


    const handleAuthorInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const tempData = inputHelper(e, authorInputs);
        setauthorInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", authorInputs.name);
        formData.append("Country", authorInputs.country);
        formData.append("BirthDate", authorInputs.birthDate.toString());


        const currentLocation = window.location.pathname;

       
       const response = await createAuthor(formData);

       if ('error' in response) {
           useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
       } else {
           toastNotify("author has been created", "success");
           navigate('/authors');
       }                        

        setLoading(false);
    };

    //const toggleIsDeleted = () => {
    //    setEmployeeInputs((prevInputs) => ({
    //        ...prevInputs,
    //        isActive: !prevInputs.isActive,
    //    }));
    //};

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
                                Add author
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
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={authorInputs.name}
                                        onChange={handleAuthorInput}
                                    />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label>BirthDate</Label>
                                    <Input
                                        type="date"
                                        name="birthDate"
                                        value={validBirthdayDate(authorInputs.birthDate)}
                                        onChange={handleAuthorInput}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Country</Label>
                                    <Input
                                        type="text"
                                        name="country"
                                        value={authorInputs.country}
                                        onChange={handleAuthorInput}
                                    />
                                </FormGroup>


                                <ButtonsContainer>
                                    <SubmitButton type="submit">
                                        Submit
                                    </SubmitButton>
                                    <BackToProductsButton onClick={() => navigate("/authors")}>
                                        Back to authors
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

export default withAuthorization(AuthorForm,[SD_Roles.ADMINISTRATOR]);
