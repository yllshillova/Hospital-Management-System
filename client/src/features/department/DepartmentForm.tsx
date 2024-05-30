/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { validBirthdayDate } from '../../app/utility/validBirthdayDate';
import { useCreateDepartmentMutation, useUpdateDepartmentMutation } from '../../app/APIs/departmentApi';
import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';

interface DepartmentData {
    name: string;
    isDeleted: boolean;
}

interface DepartmentFormProps {
    id?: string;
    data?: DepartmentData;
}

const departmentData: DepartmentData = {
    name: "",
    isDeleted: false
};

function DepartmentForm({ id, data }: DepartmentFormProps) {
    const [departmentInputs, setDepartmentInputs] = useState<DepartmentData>(data || departmentData);
    const [createDepartment] = useCreateDepartmentMutation();
    const [updateDepartment] = useUpdateDepartmentMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); // State for error messages


    useEffect(() => {
        if (data) {
            const tempData = {
                ...departmentInputs,
                isDeleted: data.isDeleted.toString() === "True",
            }
            setDepartmentInputs(tempData);
        }
    }, [data]);


    const handleDepartmentInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, departmentInputs);
        if (e.target.name === 'birthday') {
            const formattedBirthday = validBirthdayDate(tempData.birthday);
            if (formattedBirthday !== undefined) {
                tempData.birthday = formattedBirthday;
            }
        }
        setDepartmentInputs(tempData);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); // Clear previous error messages

        const formData = new FormData();

        formData.append("Name", departmentInputs.name);
        formData.append("IsDeleted", departmentInputs.isDeleted.toString());

        const currentLocation = window.location.pathname; // Capture the current URL

        if (id) {
            formData.append("Id", id);
            const response = await updateDepartment({ data: formData, id });

            if (response.error) {
                // Use error handler
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Department updated successfully", "success");
                navigate('/departments');
            }
        } else {
            const response = await createDepartment(formData);

            if (response.error) {
                // Use error handler
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Department created successfully", "success");
                navigate('/departments');
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
                            {id ? "Edit Department" : "Add Department"}
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
                                    value={departmentInputs.name}
                                    onChange={handleDepartmentInput}
                                />
                            </FormGroup>
                            {id ? <FormGroup>
                                <Label>
                                    Is Deleted{" "}
                                    <input
                                        type="checkbox"
                                        name="isDeleted"
                                        checked={departmentInputs.isDeleted}
                                        onChange={handleDepartmentInput}
                                    />
                                </Label>
                            </FormGroup>
                                : ""}
                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/departments")}>
                                    Back to Departments
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default withAuthorization(DepartmentForm, [SD_Roles.ADMINISTRATOR]);
