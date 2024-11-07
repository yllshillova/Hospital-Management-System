/* eslint-disable react-hooks/rules-of-hooks */
import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer ,SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Botuesi from '../../app/models/Botuesi';
import { useCreateBotuesiMutation, useUpdateBotuesiMutation } from '../../app/APIs/botuesiApi';

interface BotuesiFormProps {
    id?: string;
    data?: Botuesi;
}

const BotuesiData: Botuesi = {
    location: "",
    publisherName: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
};

function BotuesiForm({ id, data }:  BotuesiFormProps) {

    const [BotuesiInputs, setBotuesiInputs] = useState<Botuesi>(data || BotuesiData);
    const [createBotuesi] = useCreateBotuesiMutation();
    const [updateBotuesi] = useUpdateBotuesiMutation();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 


    


    const handleBotuesiInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const tempData = inputHelper(e, BotuesiInputs);
        setBotuesiInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("PublisherName", BotuesiInputs.publisherName);
        formData.append("Location", BotuesiInputs.location);

              

        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);

            const response = await updateBotuesi({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Botuesi has been updated ", "success");
                navigate('/botuesit');
            }
        } else {
            const response = await createBotuesi(formData);

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Botuesi has been created", "success");
                navigate('/botuesit');
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
                                {id ? "Edit Botuesi" : "Add Botuesi"}
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
                                    <Label>Publisher Name</Label>
                                    <Input
                                        type="text"
                                        name="publisherName"
                                        value={BotuesiInputs.publisherName}
                                        onChange={handleBotuesiInput}
                                    />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label>Location</Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        value={BotuesiInputs.location}
                                        onChange={handleBotuesiInput}
                                    />
                                </FormGroup>


                                
                                <ButtonsContainer>
                                    <SubmitButton type="submit">
                                        Submit
                                    </SubmitButton>
                                    <BackToProductsButton onClick={() => navigate("/botuesit")}>
                                        Back to Botuesit
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

export default BotuesiForm;
