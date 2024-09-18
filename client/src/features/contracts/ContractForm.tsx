/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { validBirthdayDate } from '../../app/utility/validBirthdayDate';
import Contract from '../../app/models/Contract';
import { useCreateContractMutation, useUpdateContractMutation } from '../../app/APIs/contractApi';
import Employee from '../../app/models/Employee';
import { useGetEmployeesQuery } from '../../app/APIs/employeeApi';

interface ContractFormProps {
    id?: string;
    data?: Contract;
}

const contractData: Contract = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "",
    startDate: new Date(),
    employeeId: "",
    employee: {} as Employee
};



function ContractForm({ id, data }: ContractFormProps) { 
    const [contractInputs, setContractInputs] = useState<Contract>(data || contractData);
    const [createContract] = useCreateContractMutation();
    const [updateContract] = useUpdateContractMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
   
    const { data : employeesData, isLoading : employeesLoading, error : employeesError } = useGetEmployeesQuery(null);



    const handleContractInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, contractInputs);
        setContractInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("Name", contractInputs.name);
        formData.append("StartDate", new Date(contractInputs.startDate!).toLocaleString());
        formData.append("EmployeeId", contractInputs.employeeId);

        const currentLocation = window.location.pathname; 

        if (id) {
            formData.append("Id", id);
            const response = await updateContract({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Contract has been updated", "success");
                navigate('/contracts');
            }
        } else {
            const response = await createContract(formData);

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Contract has been created", "success");
                navigate('/contracts');
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
                            {id ? "Edit Contract" : "Add Contract"}
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
                                    value={contractInputs.name}
                                    onChange={handleContractInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Start Date</Label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    value={validBirthdayDate(contractInputs.startDate)}
                                    onChange={handleContractInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Select
                                    name="employeeId"
                                    value={contractInputs.employeeId}
                                    onChange={handleContractInput}
                                    disabled={employeesLoading}
                                >
                                    <option value="">Select Employee</option>
                                    {employeesData && employeesData.map((employee: Employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.fullName}
                                        </option>
                                    ))}
                                </Select>
                                {employeesError && <div style={{ color: 'red' }}>Error loading employees</div>}
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/contracts")}>
                                    Back to Contracts
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default ContractForm;
