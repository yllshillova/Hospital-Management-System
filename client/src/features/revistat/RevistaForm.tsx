/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Revista from '../../app/models/Revista';
import { useCreateRevistaMutation } from '../../app/APIs/revistaApi';
import Botuesi from '../../app/models/Botuesi';
import { useGetBotuesitQuery } from '../../app/APIs/botuesiApi';

interface RevistaFormProps {
    data?: Revista;
}

const RevistaData: Revista = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    magazineName: "",
    issueNumber : 0,
    publisherId: "",
    botuesi: {} as Botuesi
};



function RevistaForm({ data }: RevistaFormProps) { 
    const [RevistaInputs, setRevistaInputs] = useState<Revista>(data || RevistaData);
    const [createRevista] = useCreateRevistaMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
   
    const { data : botuesitData, isLoading : botuesitLoading, error : botuesitError } = useGetBotuesitQuery(null);



    const handleRevistaInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, RevistaInputs);
        setRevistaInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("MagazineName", RevistaInputs.magazineName);
        formData.append("IssueNumber", RevistaInputs.issueNumber.toString());
        formData.append("PublisherId", RevistaInputs.publisherId);

        const currentLocation = window.location.pathname; 
          
        const response = await createRevista(formData);

        if ('error' in response) {
            useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
        } else {
            toastNotify("Revista has been created", "success");
            navigate('/revistat');
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
                            Add Revista
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
                                <Label>Magazine Name</Label>
                                <Input
                                    type="text"
                                    name="magazineName"
                                    value={RevistaInputs.magazineName}
                                    onChange={handleRevistaInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Issue Number</Label>
                                <Input
                                    type="number"
                                    name="issueNumber"
                                    value={RevistaInputs.issueNumber}
                                    onChange={handleRevistaInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Select
                                    name="publisherId"
                                    value={RevistaInputs.publisherId}
                                    onChange={handleRevistaInput}
                                    disabled={botuesitLoading}
                                >
                                    <option value="">Select Botuesi</option>
                                    {botuesitData && botuesitData.map((botuesi: Botuesi) => (
                                        <option key={botuesi.id} value={botuesi.id}>
                                            {botuesi.publisherName}
                                        </option>
                                    ))}
                                </Select>
                                {botuesitError && <div style={{ color: 'red' }}>Error loading botuesit</div>}
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/revistat")}>
                                    Back to Revistas
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default RevistaForm;
