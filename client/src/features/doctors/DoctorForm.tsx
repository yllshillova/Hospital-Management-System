/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { useCreateDoctorMutation, useUpdateDoctorMutation } from "../../app/APIs/doctorApi";
import { SD_Genders, SD_Roles } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { validBirthdayDate } from '../../app/utility/validBirthdayDate';
import { useGetDepartmentsQuery } from '../../app/APIs/departmentApi';
import Department from '../../app/models/Department';
import Doctor from '../../app/models/Doctor';
import withAuthorization from "../../app/hoc/withAuthorization";

interface DoctorFormProps {
    id?: string;
    data?: Doctor;
}

const doctorData: Doctor = {
    name: "",
    lastName: "",
    userName: "",
    specialization: "",
    address: "",
    residence: "",
    birthday: new Date(),
    gender: "",
    email: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(), 
    isDeleted: false,
    departmentId: "",
    password:""
};

const genders = [SD_Genders.Male, SD_Genders.Female];

function DoctorForm({ id, data }: DoctorFormProps) {

    const [doctorInputs, setDoctorInputs] = useState<Doctor>(data || doctorData);
    const [createDoctor] = useCreateDoctorMutation();
    const [updateDoctor] = useUpdateDoctorMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 

    const { data: departmentsData, isLoading: departmentsLoading, error: departmentsError } = useGetDepartmentsQuery(null);

    useEffect(() => {
        if (data) {
            const tempData = {
                ...doctorInputs,
                isDeleted: data.isDeleted.toString() === "True",
            }
            setDoctorInputs(tempData);
        }
    }, [data]);


    const handleDoctorInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, doctorInputs);
        if (e.target.name === 'birthday') {
            const formattedBirthday = validBirthdayDate(tempData.birthday);
            if (formattedBirthday !== undefined) {
                tempData.birthday = formattedBirthday;
            }
        }
        setDoctorInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", doctorInputs.name);
        formData.append("LastName", doctorInputs.lastName);
        formData.append("UserName", doctorInputs.userName);
        formData.append("Specialization", doctorInputs.specialization);
        formData.append("Address", doctorInputs.address);
        formData.append("Residence", doctorInputs.residence);
        formData.append("Birthday", doctorInputs.birthday.toString());
        formData.append("Gender", doctorInputs.gender);
        formData.append("Email", doctorInputs.email);
        formData.append("IsDeleted", doctorInputs.isDeleted.toString());
        formData.append("DepartmentId", doctorInputs.departmentId);
// Only append the password if it's not empty
        if (doctorInputs.password) {
            formData.append("Password", doctorInputs.password);
        }       

        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);
            const response = await updateDoctor({ data: formData, id });

            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Doctor updated successfully", "success");
                navigate('/doctors');
            }
        } else {
            const response = await createDoctor(formData);
            console.log(response);
            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Doctor created successfully", "success");
                navigate('/doctors');
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
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={doctorInputs.name}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={doctorInputs.lastName}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>

                            <FormGroup>
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
                                <Select
                                    name="departmentId"
                                    value={doctorInputs.departmentId}
                                    onChange={handleDoctorInput}
                                    disabled={departmentsLoading}
                                >
                                    <option value="">Select Department</option>
                                    {departmentsData && departmentsData.map((department: Department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </Select>
                                {departmentsError && <div style={{ color: 'red' }}>Error loading departments</div>}
                            </FormGroup>

                            <FormGroup>
                                <Label>User Name</Label>
                                <Input
                                    type="text"
                                    name="userName"
                                    value={doctorInputs.userName}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Birthday</Label>
                                <Input
                                    type="date"
                                    name="birthday"
                                    value={validBirthdayDate(doctorInputs.birthday)}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    value={doctorInputs.email}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>

                            {!id && (
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={doctorInputs.password}
                                        onChange={handleDoctorInput}
                                    />
                                </FormGroup>
                            )}
                            
                            <FormGroup>
                                <Label>Address</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    value={doctorInputs.address}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Residence</Label>
                                <Input
                                    type="text"
                                    name="residence"
                                    value={doctorInputs.residence}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>

                            
                           
                             <FormGroup>
                                <Label>Specialization</Label>
                                <Input
                                    type="text"
                                    name="specialization"
                                    value={doctorInputs.specialization}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            

                            {id ? <FormGroup>
                                <Label>
                                    Is Deleted{" "}
                                    <input
                                        type="checkbox"
                                        name="isDeleted"
                                        checked={doctorInputs.isDeleted}
                                        onChange={handleDoctorInput}
                                    />
                                </Label>
                            </FormGroup> : ""
                            }
                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/doctors")}>
                                    Back to Doctors
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default withAuthorization(DoctorForm, [SD_Roles.DOCTOR, SD_Roles.ADMINISTRATOR]);
