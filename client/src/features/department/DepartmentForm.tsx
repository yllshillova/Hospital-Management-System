/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { useCreateDepartmentMutation, useUpdateDepartmentMutation } from '../../app/APIs/departmentApi';
import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';
import Department from '../../app/models/Department';



interface DepartmentFormProps {
    id?: string;
    data?: Department;
}

const departmentData: Department = {
    name: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(), 
    isDeleted: false,
    staff:[]
};

function DepartmentForm({ id, data }: DepartmentFormProps) {
    const [departmentInputs, setDepartmentInputs] = useState<Department>(data || departmentData);
    const [createDepartment] = useCreateDepartmentMutation();
    const [updateDepartment] = useUpdateDepartmentMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 


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
        setDepartmentInputs(tempData);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("Name", departmentInputs.name);
        formData.append("IsDeleted", departmentInputs.isDeleted.toString());

        const currentLocation = window.location.pathname; 

        if (id) {
            formData.append("Id", id);
            const response = await updateDepartment({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Department has been updated", "success");
                navigate('/departments');
            }
        } else {
            const response = await createDepartment(formData);

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Department has been created", "success");
                navigate('/departments');
            }
        }

        setLoading(false);
    };

    const toggleIsDeleted = () => {
        setDepartmentInputs((prevInputs) => ({
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
                                        checked={departmentInputs.isDeleted.toString() === "true"}
                                        onChange={toggleIsDeleted}
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
