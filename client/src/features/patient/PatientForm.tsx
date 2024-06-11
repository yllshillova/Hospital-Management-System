/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { useCreatePatientMutation, useUpdatePatientMutation } from "../../app/APIs/patientApi";
import { SD_Genders, SD_Bloodgroups, SD_Roles } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { validBirthdayDate } from '../../app/utility/validBirthdayDate';
import withAuthorization from '../../app/hoc/withAuthorization';
import Patient from '../../app/models/Patient';

interface PatientFormProps {
    id?: string;
    data?: Patient;
}

const patientData: Patient = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "",
    lastName: "",
    parentName: "",
    personalNumber: "",
    address: "",
    residence: "",
    birthday: new Date(),
    bloodGroup: "",
    gender: "",
    email: "",
    phoneNumber: "",
    isDeleted: false,
    occupation: "",
    allergies: ""
};
const bloodGroups = [
    SD_Bloodgroups.O_Positive,
    SD_Bloodgroups.O_Negative,
    SD_Bloodgroups.A_Positive,
    SD_Bloodgroups.A_Negative,
    SD_Bloodgroups.B_Positive,
    SD_Bloodgroups.B_Negative,
    SD_Bloodgroups.AB_Positive,
    SD_Bloodgroups.AB_Negative,
];

const genders = [SD_Genders.Male, SD_Genders.Female];

function PatientForm({ id, data }: PatientFormProps) { 
    const [patientInputs, setPatientInputs] = useState<Patient>(data || patientData);
    const [createPatient] = useCreatePatientMutation();
    const [updatePatient] = useUpdatePatientMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            const tempData = {
                ...patientInputs,
                isDeleted: data.isDeleted.toString() === "True",
            }
            setPatientInputs(tempData);
        }
    }, [data]);

    const handlePatientInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, patientInputs);
        setPatientInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("Name", patientInputs.name);
        formData.append("Lastname", patientInputs.lastName);
        formData.append("ParentName", patientInputs.parentName);
        formData.append("PersonalNumber", patientInputs.personalNumber);
        formData.append("Address", patientInputs.address);
        formData.append("Residence", patientInputs.residence);
        formData.append("Birthday", patientInputs.birthday.toString());
        formData.append("BloodGroup", patientInputs.bloodGroup);
        formData.append("Gender", patientInputs.gender);
        formData.append("Email", patientInputs.email);
        formData.append("PhoneNumber", patientInputs.phoneNumber);
        formData.append("IsDeleted", patientInputs.isDeleted.toString());
        formData.append("Occupation", patientInputs.occupation);
        formData.append("Allergies", patientInputs.allergies);

        const currentLocation = window.location.pathname; 

        if (id) {
            formData.append("Id", id);
            const response = await updatePatient({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Patient has been updated", "success");
                navigate('/patients');
            }
        } else {
            const response = await createPatient(formData);

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Patient has been created", "success");
                navigate('/patients');
            }
        }

        setLoading(false);
    };

    const toggleIsDeleted = () => {
        setPatientInputs((prevInputs) => ({
            ...prevInputs,
            isDeleted: !prevInputs.isDeleted,
        }));
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
                            {id ? "Edit Patient" : "Add Patient"}
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
                                    value={patientInputs.name}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={patientInputs.lastName}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Parent Name</Label>
                                <Input
                                    type="text"
                                    name="parentName"
                                    value={patientInputs.parentName}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Personal Number</Label>
                                <Input
                                    type="text"
                                    name="personalNumber"
                                    value={patientInputs.personalNumber}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Address</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    value={patientInputs.address}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Residence</Label>
                                <Input
                                    type="text"
                                    name="residence"
                                    value={patientInputs.residence}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    value={patientInputs.email}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Phone Number</Label>
                                <Input
                                    type="text"
                                    name="phoneNumber"
                                    value={patientInputs.phoneNumber}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Occupation</Label>
                                <Input
                                    type="text"
                                    name="occupation"
                                    value={patientInputs.occupation}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Allergies</Label>
                                <Input
                                    type="text"
                                    required
                                    name="allergies"
                                    value={patientInputs.allergies}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            
                            <FormGroup>
                                <Select
                                    name="bloodGroup"
                                    required
                                    value={patientInputs.bloodGroup}
                                    onChange={handlePatientInput}
                                >
                                    <option value="">Select Blood Group</option>
                                    {bloodGroups.map((bloodGroup) => (
                                        <option key={bloodGroup} value={bloodGroup}>
                                            {bloodGroup}
                                        </option>
                                    ))}
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <Select
                                    name="gender"
                                    required
                                    value={patientInputs.gender}
                                    onChange={handlePatientInput}
                                >
                                    <option value="">Select Gender</option>
                                    {genders.map((gender) => (
                                        <option key={gender} value={gender}>
                                            {gender}
                                        </option>
                                    ))}
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <Label>Birthday</Label>
                                <Input
                                    type="date"
                                    name="birthday"
                                    value={validBirthdayDate(patientInputs.birthday)}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            {id ?  
                            <FormGroup>
                                <Label>
                                    Is Deleted{" "}
                                    <input
                                        type="checkbox"
                                        name="isDeleted"
                                        checked={patientInputs.isDeleted.toString() === "true"}
                                        onChange={toggleIsDeleted}
                                    />

                                </Label>
                            </FormGroup> : ""}
                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/patients")}>
                                    Back to Patients
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default withAuthorization(PatientForm, [SD_Roles.NURSE]);
