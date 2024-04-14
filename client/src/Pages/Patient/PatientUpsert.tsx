import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreatePatientMutation,
    useGetPatientByIdQuery,
    useUpdatePatientMutation,
} from "../../APIs/patientApi";
import { useState } from "react";
import { useEffect } from "react";
import inputHelper from "../../Helpers/inputHelper";
import toastNotify from "../../Helpers/toastNotify";
import MainLoader from "../../Common/MainLoader";
import { SD_Bloodgroups } from "../../Utility/SD";
import { Header, SidePanel } from "../../Components/Layout/Dashboard";

const bloodgroup = [
    SD_Bloodgroups.O_Positive,
    SD_Bloodgroups.O_Negative,
    SD_Bloodgroups.A_Positive,
    SD_Bloodgroups.A_Negative,
    SD_Bloodgroups.B_Positive,
    SD_Bloodgroups.B_Negative,
    SD_Bloodgroups.AB_Positive,
    SD_Bloodgroups.AB_Negative,
];
const patientData = {
    name: "",
    lastname: "",
    parentName: "",
    personalNumber: "",
    address: "",
    residence: "",
    birthday: "",
    bloodgroup: "",
    gender: "",
    email: "",
    phonenumber: "",
    createdAt: "",
    updatedAt: "",
    isDeleted: "",
    occupation: "",
    allergies: "",
};
 function PatientUpsert() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [patientInputs, setPatientInputs] = useState(patientData);
    const [loading, setLoading] = useState(false);
    const [createPatient] = useCreatePatientMutation();
    const [updatePatient] = useUpdatePatientMutation();
    const { data } = useGetPatientByIdQuery(id);

    //function useParams(): { id: any; } {
    //    throw new Error("Function not implemented.");
    //} 
    useEffect(() => {
        if (data && data.result) {
            const tempData = {
                name: data.result.name,
                lastname: data.result.lastname,
                parentName: data.result.parentName,
                personalNumber: data.result.personalNumber,
                address: data.result.address,
                residence: data.result.residence,
                birthday: data.result.birthday,
                bloodgroup: data.result.bloodgroup,
                gender: data.result.gender,
                email: data.result.email,
                phonenumber: data.result.phonenumber,
                createdAt: data.result.createdAt,
                updatedAt: data.result.updatedAt,
                isDeleted: data.result.isDeleted,
                occupation: data.result.occupation,
                allergies: data.result.allergies,
            };
            setPatientInputs(tempData);
        }
    }, [data]);

    const handlePatientInput = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const tempData = inputHelper(e, patientInputs);
        setPatientInputs(tempData);
    };

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();
         setLoading(true);


         //construct the form data
         const formData = new FormData();

         formData.append("Name", patientInputs.name);
         formData.append("Lastname", patientInputs.lastname);
         formData.append("ParentName", patientInputs.parentName);
         formData.append("PersonalNumber", patientInputs.personalNumber);
         formData.append("Address", patientInputs.address);
         formData.append("Residence", patientInputs.residence);
         formData.append("Birthday", patientInputs.birthday);
         formData.append("BloodGroup", patientInputs.bloodgroup);
         formData.append("Gender", patientInputs.gender);
         formData.append("Email", patientInputs.email);
         formData.append("PhoneNumber", patientInputs.phonenumber);
         formData.append("CreatedAt", patientInputs.createdAt);
         formData.append("UpdatedAt", patientInputs.updatedAt);
         formData.append("IsDeleted", patientInputs.isDeleted);
         formData.append("Occupation", patientInputs.occupation);
         formData.append("Allergies", patientInputs.allergies);

         let response;

         if (id) {
             formData.append("Id", id);
             console.log(
                 "Update Patient Data:",
                 Object.fromEntries(formData.entries())
             ); // Log the data before the update
             response = await updatePatient({ data: formData, id });
             console.log("Update Patient Response:", response); // Log the response after the update
             //console.log(response);
             toastNotify("Patient updated successfully", "success");
         } else {
             console.log(
                 "Create Product Data:",
                 Object.fromEntries(formData.entries())
             ); // Log the data before the creation
             response = await createPatient(formData);
             console.log("Create Patient Response:", response); // Log the response after the creation
             toastNotify("Patient created successfully", "success");
         }

         if (response) {
             setLoading(false);
             navigate("/patientsList");
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
                        {<Title>
                            {id ? "Edit Patient" : "Add Patient"}
                        </Title>}

                        <Form
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <FormGroup>
                                <Label>Name:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="name"
                                    value={patientInputs.name}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>LastName:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="lastname"
                                    value={patientInputs.lastname}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>ParentName:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="parentName"
                                    value={patientInputs.parentName}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>PersonalNumber:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="personalNumber"
                                    value={patientInputs.personalNumber}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Address:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="address"
                                    value={patientInputs.address}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Residence:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="residence"
                                    value={patientInputs.residence}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Birthday:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="birthday"
                                    value={patientInputs.birthday}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Bloodgroup:</Label>
                                <Select
                                    name="bloodgroup"
                                    value={patientInputs.bloodgroup}
                                    onChange={handlePatientInput}
                                >
                                    <option value="">Select Blood Group</option>
                                    {bloodgroup.map((bloodgroup) => (
                                        <option key={bloodgroup} value={bloodgroup}>
                                            {bloodgroup}
                                        </option>
                                    ))}
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <Label>Gender:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="gender"
                                    value={patientInputs.gender}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="email"
                                    value={patientInputs.email}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Phonenumber:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="phonenumber"
                                    value={patientInputs.phonenumber}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>CreatedAt:</Label>
                                <Input
                                    type="date"
                                    required
                                    name="createdAt"
                                    value={patientInputs.createdAt}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>UpdatedAt:</Label>
                                <Input
                                    type="date"
                                    required
                                    name="updatedAt"
                                    value={patientInputs.updatedAt}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>isDeleted:</Label>
                                <Input
                                    type="checkbox"
                                    required
                                    name="isDeleted"
                                    value={patientInputs.isDeleted}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Occupation:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="occupation"
                                    value={patientInputs.occupation}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Allergies:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="allergies"
                                    value={patientInputs.allergies}
                                    onChange={handlePatientInput}
                                />
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/patientList")}>
                                    Back to patients
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

const OuterContainer = styled.div`
  margin-left: 200px;

  background-color: #f5f5f5;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: white;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const FormContainer = styled.div`
  padding: 30px; 
`;

const Title = styled.h3`
  color: teal;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 750;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: #333;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 15px; // Increase the padding for larger inputs
  font-size: 16px; // Increase the font size for better visibility
  border: 1px solid #ddd;
  border-radius: 8px; // Increase the border-radius for rounded corners
  box-sizing: border-box;
`;

const Select = styled.select`
 width: 100%;
  max-width: 100%;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 30%;
  padding: 8px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  margin-right: 5px;
  font-weight: 600;
  transition: ease 0.3s;

  &:hover {
    background-color: teal;
    color: white;
    transform: scale(1.1);
  }
`;

const BackToProductsButton = styled.button`
  width: 30%;
  padding: 8px;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  margin-left: 5px;
  font-weight: 600;
  transition: ease 0.3s;

  &:hover {
    color: black;
    transform: scale(1.1);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

export default PatientUpsert;