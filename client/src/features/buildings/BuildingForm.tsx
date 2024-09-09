/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer ,SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { SD_Roles } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import withAuthorization from "../../app/hoc/withAuthorization";
import Building from '../../app/models/Building';
import { useCreateBuildingMutation } from '../../app/APIs/buildingApi';

interface BuildingFormProps {
    data?: Building;
}

const buildingData: Building = {
    name: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    location: "",
};

function BuildingForm( { data }: BuildingFormProps) {

    const [buildingInputs, setBuildingInputs] = useState<Building>(data || buildingData);
    const [createBuilding] = useCreateBuildingMutation();
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 



    const handleBuildingInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const tempData = inputHelper(e, buildingInputs);
        setBuildingInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", buildingInputs.name);
        formData.append("Location", buildingInputs.location);

              

        const currentLocation = window.location.pathname;

       
       const response = await createBuilding(formData);

       if ('error' in response) {
           useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
       } else {
           toastNotify("Building has been created", "success");
           navigate('/buildings');
       }                        

        setLoading(false);
    };

    //const toggleIsDeleted = () => {
    //    setBuildingInputs((prevInputs) => ({
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
                                Add Building
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
                                        value={buildingInputs.name}
                                        onChange={handleBuildingInput}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Location</Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        value={buildingInputs.location}
                                        onChange={handleBuildingInput}
                                    />
                                </FormGroup>

                                <ButtonsContainer>
                                    <SubmitButton type="submit">
                                        Submit
                                    </SubmitButton>
                                    <BackToProductsButton onClick={() => navigate("/buildings")}>
                                        Back to Buildings
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

export default withAuthorization(BuildingForm,[SD_Roles.ADMINISTRATOR]);
