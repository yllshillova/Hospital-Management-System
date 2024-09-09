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
import Renovation from '../../app/models/Renovation';
import Building from '../../app/models/Building';
import { useCreateRenovationMutation } from '../../app/APIs/renovationApi';
import { useGetBuildingsQuery } from '../../app/APIs/buildingApi';

interface RenovationFormProps {
    data?: Renovation;
}

const renovationData: Renovation = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "",
    cost: 0,
    buildingID: "",
    building: {} as Building
};



function RenovationForm({ data }: RenovationFormProps) { 
    const [renovationInputs, setRenovationInputs] = useState<Renovation>(data || renovationData);
    const [createRenovation] = useCreateRenovationMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
   
    const { data : buildingsData, isLoading : buildingsLoading, error : buildingsError } = useGetBuildingsQuery(null);



    const handleRenovationInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, renovationInputs);
        setRenovationInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("Description", renovationInputs.description);
        formData.append("Cost", renovationInputs.cost.toString());
        formData.append("BuildingID", renovationInputs.buildingID);

        const currentLocation = window.location.pathname; 

        const response = await createRenovation(formData);

        if ('error' in response) {
            useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
        } else {
            toastNotify("Renovation has been created", "success");
            navigate('/renovations');
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
                            Add Renovation
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
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={renovationInputs.description}
                                    onChange={handleRenovationInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Cost</Label>
                                <Input
                                    type="number"
                                    name="cost"
                                    value={renovationInputs.cost}
                                    onChange={handleRenovationInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Select
                                    name="buildingID"
                                    value={renovationInputs.buildingID}
                                    onChange={handleRenovationInput}
                                    disabled={buildingsLoading}
                                >
                                    <option value="">Select Building</option>
                                    {buildingsData && buildingsData.map((building: Building) => (
                                        <option key={building.id} value={building.id}>
                                            {building.name}
                                        </option>
                                    ))}
                                </Select>
                                {buildingsError && <div style={{ color: 'red' }}>Error loading buildings</div>}
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/renovations")}>
                                    Back to Renovations
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default withAuthorization(RenovationForm, [SD_Roles.ADMINISTRATOR]);
