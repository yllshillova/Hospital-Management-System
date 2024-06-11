/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { useCreateNurseMutation, useUpdateNurseMutation } from "../../app/APIs/nurseApi";
import { SD_Genders, SD_Roles } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { validBirthdayDate } from '../../app/utility/validBirthdayDate';
import { useGetDepartmentsQuery } from '../../app/APIs/departmentApi';
import Department from '../../app/models/Department';
import Nurse from '../../app/models/Nurse';
import withAuthorization from '../../app/hoc/withAuthorization';


interface NurseFormProps {
    id?: string;
    data?: Nurse;
}

const nurseData: Nurse = {
    name: "",
    lastName: "",
    userName:"",
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
    password: ""
};

const genders = [SD_Genders.Male, SD_Genders.Female];

function NurseForm({ id, data }: NurseFormProps) {
    const [nurseInputs, setNurseInputs] = useState<Nurse>(data || nurseData);
    const [createNurse] = useCreateNurseMutation();
    const [updateNurse] = useUpdateNurseMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 

    const { data: departmentsData, isLoading: departmentsLoading, error: departmentsError } = useGetDepartmentsQuery(null);

    useEffect(() => {
        if (data) {
            const tempData = {
                ...nurseInputs,
                isDeleted: data.isDeleted.toString() === "True",
            }
            setNurseInputs(tempData);
        }
    }, [data]);


    const handleNurseInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, nurseInputs);
        setNurseInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", nurseInputs.name);
        formData.append("LastName", nurseInputs.lastName);
        formData.append("UserName", nurseInputs.userName);
        formData.append("Address", nurseInputs.address);
        formData.append("Residence", nurseInputs.residence);
        formData.append("Birthday", nurseInputs.birthday.toString());
        formData.append("Gender", nurseInputs.gender);
        formData.append("Email", nurseInputs.email);
        formData.append("IsDeleted", nurseInputs.isDeleted.toString());
        formData.append("DepartmentId", nurseInputs.departmentId);

        if (nurseInputs.password) {
            formData.append("Password", nurseInputs.password);
        }

        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);
            const response = await updateNurse({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Nurse has been updated ", "success");
                navigate('/nurses');
            }
        } else {
            const response = await createNurse(formData);
            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Nurse has been created ", "success");
                navigate('/nurses');
            }
        }

        setLoading(false);
    };

    const toggleIsDeleted = () => {
        setNurseInputs((prevInputs) => ({
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
                            {id ? "Edit Nurse" : "Add Nurse"}
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
                                    value={nurseInputs.name}
                                    onChange={handleNurseInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={nurseInputs.lastName}
                                    onChange={handleNurseInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Select
                                    name="gender"
                                    value={nurseInputs.gender}
                                    onChange={handleNurseInput}
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
                                    value={nurseInputs.departmentId}
                                    onChange={handleNurseInput}
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
                                    value={nurseInputs.userName}
                                    onChange={handleNurseInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Birthday</Label>
                                <Input
                                    type="date"
                                    name="birthday"
                                    value={validBirthdayDate(nurseInputs.birthday)}
                                    onChange={handleNurseInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    value={nurseInputs.email}
                                    onChange={handleNurseInput}
                                />
                            </FormGroup>

                            {!id && (
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={nurseInputs.password}
                                    onChange={handleNurseInput}
                                />
                            </FormGroup>
                            )}
                            
                            <FormGroup>
                                <Label>Address</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    value={nurseInputs.address}
                                    onChange={handleNurseInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Residence</Label>
                                <Input
                                    type="text"
                                    name="residence"
                                    value={nurseInputs.residence}
                                    onChange={handleNurseInput}
                                />
                            </FormGroup>

                            {id ? <FormGroup>
                                <Label>
                                    Is Deleted{" "}
                                    <input
                                        type="checkbox"
                                        name="isDeleted"
                                        checked={nurseInputs.isDeleted.toString() === "true"}
                                        onChange={toggleIsDeleted}
                                    />
                                </Label>
                            </FormGroup> : ""
                            }
                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/nurses")}>
                                    Back to Nurses
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default withAuthorization(NurseForm, [SD_Roles.NURSE, SD_Roles.ADMINISTRATOR]);
