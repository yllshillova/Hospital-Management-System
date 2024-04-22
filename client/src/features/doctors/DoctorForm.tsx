/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { useCreateDoctorMutation, useUpdateDoctorMutation } from "../../app/APIs/doctorApi";
import { SD_Genders } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';

interface DoctorData {
    name: string;
    lastName: string;
    specialization: string;
    address: string;
    residence: string;
    birthday: string;
    gender: string;
    email: string;
    isDeleted: boolean;
    departmentId: string;
}

interface DoctorFormProps {
    id?: string;
    data?: DoctorData;
}

const doctorData: DoctorData = {
    name: "",
    lastName: "",
    specialization: "",
    address: "",
    residence: "",
    birthday: "",
    gender: "",
    email: "",
    isDeleted: false,
    departmentId: ""
};

const genders = [SD_Genders.Male, SD_Genders.Female];

function DoctorForm({ id, data }: DoctorFormProps) {
    const [doctorInputs, setDoctorInputs] = useState<DoctorData>(data || doctorData);
    const [createDoctor] = useCreateDoctorMutation();
    const [updateDoctor] = useUpdateDoctorMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); // State for error messages

    const handleDoctorInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, doctorInputs);
        if (e.target.name === 'birthday') {
            const formattedBirthday = formatBirthday(tempData.birthday);
            if (formattedBirthday !== undefined) {
                tempData.birthday = formattedBirthday;
            }
        }
        setDoctorInputs(tempData);
    };

    const formatBirthday = (birthday: string | Date): string | undefined => {
        if (birthday) {
            const date = new Date(birthday);
            if (!isNaN(date.getTime())) {
                // Format date as YYYY-MM-DD if the date is valid
                return date.toISOString().split('T')[0];
            }
        }
        return undefined;
    };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages([]); // Clear previous error messages

    const formData = new FormData();

    formData.append("Name", doctorInputs.name);
    formData.append("LastName", doctorInputs.lastName);
    formData.append("Specialization", doctorInputs.specialization);
    formData.append("Address", doctorInputs.address);
    formData.append("Residence", doctorInputs.residence);
    formData.append("Birthday", doctorInputs.birthday);
    formData.append("Gender", doctorInputs.gender);
    formData.append("Email", doctorInputs.email);
    formData.append("IsDeleted", doctorInputs.isDeleted.toString());
    formData.append("DepartmentId", doctorInputs.departmentId);

    const currentLocation = window.location.pathname; // Capture the current URL

    if (id) {
        formData.append("Id", id);
        const response = await updateDoctor({ data: formData, id });

        if (response.error) {
            // Use error handler
            useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
        } else {
            toastNotify("Doctor updated successfully", "success");
            navigate('/doctors');
        }
    } else {
        const response = await createDoctor(formData);

        if (response.error) {
            // Use error handler
            useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
        } else {
            toastNotify("Doctor created successfully", "success");
            navigate('/doctors');
        }
    }

    setLoading(false);
};

    const toggleIsDeleted = () => {
        setDoctorInputs((prevInputs) => ({
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
                            {id ? "Edit Doctor" : "Add Doctor"}
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
                                <Label>Name:</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={doctorInputs.name}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name:</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={doctorInputs.lastName}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Specialization:</Label>
                                <Input
                                    type="text"
                                    name="specialization"
                                    value={doctorInputs.specialization}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Address:</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    value={doctorInputs.address}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Residence:</Label>
                                <Input
                                    type="text"
                                    name="residence"
                                    value={doctorInputs.residence}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Birthday:</Label>
                                <Input
                                    type="date"
                                    name="birthday"
                                    value={formatBirthday(doctorInputs.birthday)}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Gender:</Label>
                                <Select
                                    name="gender"
                                    value={doctorInputs.gender}
                                    onChange={handleDoctorInput}
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
                                <Label>Email:</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    value={doctorInputs.email}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>DepartmentId:</Label>
                                <Input
                                    type="text"
                                    name="departmentId"
                                    value={doctorInputs.departmentId}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Is Deleted{" "}
                                    <input
                                        type="checkbox"
                                        name="isDeleted"
                                        checked={doctorInputs.isDeleted}
                                        onChange={toggleIsDeleted}
                                    />
                                </Label>
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/doctors")}>
                                    Back to doctors
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default DoctorForm;
