/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import EmergencyContact from '../../app/models/EmergencyContact';
import { useCreateEmergencyContactMutation, useUpdateEmergencyContactMutation } from '../../app/APIs/emergencyContactApi';
import Patient from '../../app/models/Patient';

interface EmergencyContactFormProps {
    id?: string;
    data?: EmergencyContact;
    patientId?: string;
}

const emergencyContactData: EmergencyContact = {
    contactName: "",
    relation: "",
    phoneNumber: "",
    id: "",
    patientId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    patient: {} as Patient
};


function EmergencyContactForm({ id, data }: EmergencyContactFormProps) {
    const { patientId } = useParams<{ patientId: string }>();
    const [emergencyContactInputs, setEmergencyContactInputs] = useState<EmergencyContact>({ ...emergencyContactData, patientId: patientId || "" });
    const [createEmergencyContact] = useCreateEmergencyContactMutation();
    const [updateEmergencyContact] = useUpdateEmergencyContactMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);


    useEffect(() => {
        if (data) {
            setEmergencyContactInputs(data);
        }
    }, [data]);

    const handleEmergencyContactInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, emergencyContactInputs);
        setEmergencyContactInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

       

        const formData = new FormData();

        formData.append("ContactName", emergencyContactInputs.contactName);
        formData.append("Relation", emergencyContactInputs.relation);
        formData.append("PhoneNumber", emergencyContactInputs.phoneNumber);
        formData.append("PatientId", emergencyContactInputs.patientId);
        

        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);
            const response = await updateEmergencyContact({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("EmergencyContact has been updated", "success");
                navigate("/patient/" + emergencyContactInputs.patientId);
            }
        } else {
            const response = await createEmergencyContact(formData);
            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("EmergencyContact has been created", "success");
                navigate("/patient/" + emergencyContactInputs.patientId);
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
                            {id ? "Edit Emergency Contact" : "Add Emergency Contact"}
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
                                <Label> Name and last name</Label>
                                <Input
                                    type="text"
                                    name="contactName"
                                    value={emergencyContactInputs.contactName}
                                    onChange={handleEmergencyContactInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Relation</Label>
                                <Input
                                    type="text"
                                    name="relation"
                                    value={emergencyContactInputs.relation}
                                    onChange={handleEmergencyContactInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Phone Number</Label>
                                <Input
                                    type="text"
                                    name="phoneNumber"
                                    value={emergencyContactInputs.phoneNumber}
                                    onChange={handleEmergencyContactInput}
                                />
                            </FormGroup>
                           
                            {/*<FormGroup>*/}
                            {/*    <Select*/}
                            {/*        name="patientId"*/}
                            {/*        value={emergencyContactInputs.patientId}*/}
                            {/*        onChange={handleEmergencyContactInput}*/}
                            {/*        disabled={patientsLoading}*/}
                            {/*    >*/}
                            {/*        <option value="">Select Patient</option>*/}
                            {/*        {patientsData && patientsData.map((patient: Patient) => (*/}
                            {/*            <option key={patient.id} value={patient.id}>*/}
                            {/*                {patient.name}*/}
                            {/*            </option>*/}
                            {/*        ))}*/}
                            {/*    </Select>*/}
                            {/*    {patientsError && <div style={{ color: 'red' }}>Error loading patients</div>}*/}
                            {/*</FormGroup>*/}

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/patient/" + emergencyContactInputs.patientId)}>
                                    Back to Patient Details
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default EmergencyContactForm;
