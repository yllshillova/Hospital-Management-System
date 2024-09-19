/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer ,SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { SD_Roles } from "../../app/utility/SD";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import withAuthorization from "../../app/hoc/withAuthorization";
import Employee from '../../app/models/Employee';
import { useCreateEmployeeMutation } from '../../app/APIs/employeeApi';

interface EmployeeFormProps {
    data?: Employee;
}

const employeeData: Employee = {
    fullName: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
};

function EmployeeForm( { data }: EmployeeFormProps) {

    const [employeeInputs, setEmployeeInputs] = useState<Employee>(data || employeeData);
    const [createEmployee] = useCreateEmployeeMutation();
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 


    useEffect(() => {
        if (data) {
            const tempData = {
                ...employeeInputs,
                isActive: data.isActive.toString() === "True",
            }
            setEmployeeInputs(tempData);
        }
    }, [data]);


    const handleEmployeeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const tempData = inputHelper(e, employeeInputs);
        setEmployeeInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("FullName", employeeInputs.fullName);
        formData.append("IsActive", employeeInputs.isActive.toString());

              

        const currentLocation = window.location.pathname;

       
       const response = await createEmployee(formData);

       if ('error' in response) {
           useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
       } else {
           toastNotify("Employee has been created", "success");
           navigate('/employees');
       }                        

        setLoading(false);
    };

    //const toggleIsDeleted = () => {
    //    setEmployeeInputs((prevInputs) => ({
    //        ...prevInputs,
    //        isActive: !prevInputs.isActive,
    //    }));
    //};

    let content;

        content = (
            <>
                <Header />
                <SidePanel />
                <OuterContainer>
                    <Container>
                        <FormContainer >
                            {loading && <MainLoader />}
                            <Title>
                                Add Employee
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
                                        name="fullName"
                                        value={employeeInputs.fullName}
                                        onChange={handleEmployeeInput}
                                    />
                                </FormGroup>
                                

                                {/*{id ? <FormGroup>*/}
                                {/*    <Label>*/}
                                {/*        Is Deleted{" "}*/}
                                {/*        <input*/}
                                {/*            type="checkbox"*/}
                                {/*            name="isDeleted"*/}
                                {/*            checked={doctorInputs.isDeleted.toString() === "true"}*/}
                                {/*            onChange={toggleIsDeleted}*/}
                                {/*        />*/}
                                {/*    </Label>*/}
                                {/*</FormGroup> : ""*/}
                                {/*}*/}
                                <ButtonsContainer>
                                    <SubmitButton type="submit">
                                        Submit
                                    </SubmitButton>
                                    <BackToProductsButton onClick={() => navigate("/employees")}>
                                        Back to Doctors
                                    </BackToProductsButton>
                                </ButtonsContainer>
                            </Form>
                        </FormContainer>
                    </Container>
                </OuterContainer>
            </>
        );
        return content;
    }

export default withAuthorization(EmployeeForm,[SD_Roles.ADMINISTRATOR]);
