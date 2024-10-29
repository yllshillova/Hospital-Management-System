/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer ,SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Planet from '../../app/models/Planet';
import { useCreatePlanetMutation, useUpdatePlanetMutation } from '../../app/APIs/planetApi';

interface PlanetFormProps {
    id?: string;
    data?: Planet;
}

const planetData: Planet = {
    name: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
    type:"",
};

function PlanetForm({ id, data }:  PlanetFormProps) {

    const [planetInputs, setPlanetInputs] = useState<Planet>(data || planetData);
    const [createPlanet] = useCreatePlanetMutation();
    const [updatePlanet] = useUpdatePlanetMutation();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 


    useEffect(() => {
        if (data) {
            const tempData = {
                ...planetInputs,
                isDeleted: data.isDeleted.toString() === "true",
            }
            setPlanetInputs(tempData);
        }
    }, [data]);


    const handlePlanetInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const tempData = inputHelper(e, planetInputs);
        setPlanetInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", planetInputs.name);
        formData.append("Type", planetInputs.type);
        formData.append("IsDeleted", planetInputs.isDeleted.toString());

              

        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);

            const response = await updatePlanet({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Planet has been updated ", "success");
                navigate('/planets');
            }
        } else {
            const response = await createPlanet(formData);

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Planet has been created", "success");
                navigate('/planets');
            }
        }                       

        setLoading(false);
    };

    const toggleIsDeleted = () => {
        setPlanetInputs((prevInputs) => ({
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
                                {id ? "Edit Planet" : "Add Planet"}
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
                                        value={planetInputs.name}
                                        onChange={handlePlanetInput}
                                    />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label>Type</Label>
                                    <Input
                                        type="text"
                                        name="type"
                                        value={planetInputs.type}
                                        onChange={handlePlanetInput}
                                    />
                                </FormGroup>

                                {id ? <FormGroup>
                                    <Label>
                                        Is Deleted{" "}
                                        <input
                                            type="checkbox"
                                            name="isDeleted"
                                            checked={planetInputs.isDeleted.toString() === "true"}
                                            onChange={toggleIsDeleted}
                                        />
                                    </Label>
                                </FormGroup> : ""
                                }
                                <ButtonsContainer>
                                    <SubmitButton type="submit">
                                        Submit
                                    </SubmitButton>
                                    <BackToProductsButton onClick={() => navigate("/planets")}>
                                        Back to Planets
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

export default PlanetForm;
