/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer ,SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Sculptor from '../../app/models/Sculptor';
import { useCreateSculptorMutation, useUpdateSculptorMutation } from '../../app/APIs/sculptorApi';

interface SculptorFormProps {
    id?: string;
    data?: Sculptor;
}

const sculptorData: Sculptor = {
    name: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
    birthYear:0,
};

function SculptorForm({ id, data }:  SculptorFormProps) {

    const [sculptorInputs, setSculptorInputs] = useState<Sculptor>(data || sculptorData);
    const [createSculptor] = useCreateSculptorMutation();
    const [updateSculptor] = useUpdateSculptorMutation();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 


    useEffect(() => {
        if (data) {
            const tempData = {
                ...sculptorInputs,
                isDeleted: data.isDeleted.toString() === "true",
            }
            setSculptorInputs(tempData);
        }
    }, [data]);


    const handleSculptorInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const tempData = inputHelper(e, sculptorInputs);
        setSculptorInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", sculptorInputs.name);
        formData.append("BirthYear", sculptorInputs.birthYear.toString());
        formData.append("IsDeleted", sculptorInputs.isDeleted.toString());

              

        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);

            const response = await updateSculptor({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Sculptor has been updated ", "success");
                navigate('/sculptors');
            }
        } else {
            const response = await createSculptor(formData);

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Sculptor has been created", "success");
                navigate('/sculptors');
            }
        }                       

        setLoading(false);
    };

    const toggleIsDeleted = () => {
        setSculptorInputs((prevInputs) => ({
            ...prevInputs,
            isDeleted: !prevInputs.isDeleted,
        }));
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
                                {id ? "Edit Sculptor" : "Add Sculptor"}
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
                                        value={sculptorInputs.name}
                                        onChange={handleSculptorInput}
                                    />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label>Birth Year</Label>
                                    <Input
                                        type="text"
                                        name="birthYear"
                                        value={sculptorInputs.birthYear}
                                        onChange={handleSculptorInput}
                                    />
                                </FormGroup>

                                {id ? <FormGroup>
                                    <Label>
                                        Is Deleted{" "}
                                        <input
                                            type="checkbox"
                                            name="isDeleted"
                                            checked={sculptorInputs.isDeleted.toString() === "true"}
                                            onChange={toggleIsDeleted}
                                        />
                                    </Label>
                                </FormGroup> : ""
                                }
                                <ButtonsContainer>
                                    <SubmitButton type="submit">
                                        Submit
                                    </SubmitButton>
                                    <BackToProductsButton onClick={() => navigate("/sculptors")}>
                                        Back to Sculptors
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

export default SculptorForm;
