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
import Satellite from '../../app/models/Satellite';
import Planet from '../../app/models/Planet';
import { useGetPlanetsQuery } from '../../app/APIs/planetApi';
import { useCreateSatelliteMutation } from '../../app/APIs/satelliteApi';

interface SatelliteFormProps {
    data?: Satellite;
}

const satelliteData: Satellite = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "",
    isDeleted : false,
    planetId: "",
    planet: {} as Planet
};



function SatelliteForm({ data }: SatelliteFormProps) { 
    const [satelliteInputs, setSatelliteInputs] = useState<Satellite>(data || satelliteData);
    const [createSatellite] = useCreateSatelliteMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
   
    const { data : planetsData, isLoading : planetsLoading, error : planetsError } = useGetPlanetsQuery(null);



    const handleSatelliteInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, satelliteInputs);
        setSatelliteInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("Name", satelliteInputs.name);
        formData.append("IsDeleted", satelliteInputs.isDeleted.toString());
        formData.append("PlanetId", satelliteInputs.planetId);

        const currentLocation = window.location.pathname; 

        
        const response = await createSatellite(formData);

        if ('error' in response) {
            useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
        } else {
            toastNotify("Satellite has been created", "success");
            navigate('/satellites');
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
                            Add Satellite
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
                                    name="name"
                                    value={satelliteInputs.name}
                                    onChange={handleSatelliteInput}
                                />
                            </FormGroup>

                            {/*{id ? <FormGroup>*/}
                            {/*    <Label>*/}
                            {/*        Is Deleted{" "}*/}
                            {/*        <input*/}
                            {/*            type="checkbox"*/}
                            {/*            name="isDeleted"*/}
                            {/*            checked={doctorInputs.isDeleted.toString() === "true"}*/}
                            {/*            onChange={toggleIsDeleted}*/}
                            {/*        />*/}
                            {/*    </Label>*/}
                            {/*</FormGroup> : ""*/}
                            {/*}*/}

                            <FormGroup>
                                <Select
                                    name="planetId"
                                    value={satelliteInputs.planetId}
                                    onChange={handleSatelliteInput}
                                    disabled={planetsLoading}
                                >
                                    <option value="">Select Planet</option>
                                    {planetsData && planetsData.map((planet: Planet) => (
                                        <option key={planet.id} value={planet.id}>
                                            {planet.name}
                                        </option>
                                    ))}
                                </Select>
                                {planetsError && <div style={{ color: 'red' }}>Error loading planets</div>}
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/satellites")}>
                                    Back to Satellites
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default withAuthorization(SatelliteForm, [SD_Roles.ADMINISTRATOR]);
