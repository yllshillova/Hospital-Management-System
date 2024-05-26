/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
//import { useCreateDoctorMutation, useUpdateDoctorMutation } from "../../app/APIs/doctorApi";
//import { SD_Genders } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
//import { validBirthdayDate } from '../../app/utility/validBirthdayDate';
//import { useGetDepartmentsQuery } from '../../app/APIs/departmentApi';
//import Department from '../../app/models/Department';
//import Doctor from '../../app/models/Doctor';
import EmergencyContact from '../../app/models/EmergencyContact';
import { useCreateEmergencyContactMutation, useUpdateEmergencyContactMutation } from '../../app/APIs/emergencyContactApi';
import Patient from '../../app/models/Patient';
import { useGetPatientsQuery } from '../../app/APIs/patientApi';

interface EmergencyContactFormProps {
    id?: string;
    data?: EmergencyContact;
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

//const genders = [SD_Genders.Male, SD_Genders.Female];

function EmergencyContactForm({ id, data }: EmergencyContactFormProps) {
    const [emergencyContactInputs, setEmergencyContactInputs] = useState<EmergencyContact>(data || emergencyContactData);
    const [createEmergencyContact] = useCreateEmergencyContactMutation();
    const [updateEmergencyContact] = useUpdateEmergencyContactMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const { data: patientsData, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null);

    
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

            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("EmergencyContact updated successfully", "success");
                navigate("/patient/" + emergencyContactInputs.patientId);
            }
        } else {
            const response = await createEmergencyContact(formData);
            console.log(response);
            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("EmergencyContact created successfully", "success");
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
                            {id ? "Edit EmergencyContact" : "Add EmergencyContact"}
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
                                <Label>ContactName</Label>
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
                                <Label>PhoneNumber</Label>
                                <Input
                                    type="text"
                                    name="phoneNumber"
                                    value={emergencyContactInputs.phoneNumber}
                                    onChange={handleEmergencyContactInput}
                                />
                            </FormGroup>
                           
                            <FormGroup>
                                <Select
                                    name="patientId"
                                    value={emergencyContactInputs.patientId}
                                    onChange={handleEmergencyContactInput}
                                    disabled={patientsLoading}
                                >
                                    <option value="">Select Patient</option>
                                    {patientsData && patientsData.map((patient: Patient) => (
                                        <option key={patient.id} value={patient.id}>
                                            {patient.name}
                                        </option>
                                    ))}
                                </Select>
                                {patientsError && <div style={{ color: 'red' }}>Error loading patients</div>}
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/patient/" + emergencyContactInputs.patientId)}>
                                    Back to PatientDetails
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
