/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Renovation from '../../app/models/Renovation';
import { useCreateRenovationMutation } from '../../app/APIs/renovationApi';
import Building from '../../app/models/Building';
import { useGetBuildingsQuery } from '../../app/APIs/buildingApi';

interface RenovationFormProps {
    data?: Renovation;
}

const RenovationData: Renovation = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "",
    cost : 0,
    buildingID: "",
    building: {} as Building
};



function RenovationForm({ data }: RenovationFormProps) { 
    const [RenovationInputs, setRenovationInputs] = useState<Renovation>(data || RenovationData);
    const [createRenovation] = useCreateRenovationMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
   
    const { data : buildingsData, isLoading : buildingsLoading, error : buildingsError } = useGetBuildingsQuery(null);



    const handleRenovationInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, RenovationInputs);
        setRenovationInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("Description", RenovationInputs.description);
        formData.append("Cost", RenovationInputs.cost.toString());
        formData.append("buildingID", RenovationInputs.buildingID);

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
                                <Label>Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={RenovationInputs.description}
                                    onChange={handleRenovationInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Cost</Label>
                                <Input
                                    type="number"
                                    name="cost"
                                    value={RenovationInputs.cost}
                                    onChange={handleRenovationInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Select
                                    name="buildingID"
                                    value={RenovationInputs.buildingID}
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

export default RenovationForm;
