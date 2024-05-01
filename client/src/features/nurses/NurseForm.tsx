/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { useCreateNurseMutation, useUpdateNurseMutation } from "../../app/APIs/nurseApi";
import { SD_Genders } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { validBirthdayDate } from '../../app/utility/validBirthdayDate';
import { useGetDepartmentsQuery } from '../../app/APIs/departmentApi';
import Department from '../../app/models/Department';

interface NurseData {
    name: string;
    lastName: string;
    address: string;
    residence: string;
    birthday: string;
    gender: string;
    email: string;
    isDeleted: boolean;
    departmentId: string;
}

interface NurseFormProps {
    id?: string;
    data?: NurseData;
}

const nurseData: NurseData = {
    name: "",
    lastName: "",
    address: "",
    residence: "",
    birthday: "",
    gender: "",
    email: "",
    isDeleted: false,
    departmentId: ""
};

const genders = [SD_Genders.Male, SD_Genders.Female];

function NurseForm({ id, data }: NurseFormProps) {
    const [nurseInputs, setNurseInputs] = useState<NurseData>(data || nurseData);
    const [createNurse] = useCreateNurseMutation();
    const [updateNurse] = useUpdateNurseMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); // State for error messages

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
        if (e.target.name === 'birthday') {
            const formattedBirthday = validBirthdayDate(tempData.birthday);
            if (formattedBirthday !== undefined) {
                tempData.birthday = formattedBirthday;
            }
        }
        setNurseInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", nurseInputs.name);
        formData.append("LastName", nurseInputs.lastName);
        formData.append("Address", nurseInputs.address);
        formData.append("Residence", nurseInputs.residence);
        formData.append("Birthday", nurseInputs.birthday);
        formData.append("Gender", nurseInputs.gender);
        formData.append("Email", nurseInputs.email);
        formData.append("IsDeleted", nurseInputs.isDeleted.toString());
        formData.append("DepartmentId", nurseInputs.departmentId);

        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);
            const response = await updateNurse({ data: formData, id });

            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Nurse updated successfully", "success");
                navigate('/nurses');
            }
        } else {
            const response = await createNurse(formData);

            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Nurse created successfully", "success");
                navigate('/nurses');
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
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    value={nurseInputs.email}
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

                            {id ? <FormGroup>
                                <Label>
                                    Is Deleted{" "}
                                    <input
                                        type="checkbox"
                                        name="isDeleted"
                                        checked={nurseInputs.isDeleted}
                                        onChange={handleNurseInput}
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

export default NurseForm;
