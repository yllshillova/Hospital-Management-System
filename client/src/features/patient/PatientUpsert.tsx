import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreatePatientMutation, useGetPatientByIdQuery, useUpdatePatientMutation } from "../../app/APIs/patientApi";
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, Select, FormGroup, Input, Label, OuterContainer, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { SD_Bloodgroups } from "../../app/utility/SD";

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
    lastName: "",
    parentName: "",
    personalNumber: "",
    address: "",
    residence: "",
    birthday: "",
    bloodgroup: "",
    gender: "",
    email: "",
    phoneNumber: "",
    createdAt: "",
    updatedAt: "",
    isDeleted: false,
    occupation: "",
    allergies: ""
};
function PatientUpsert() {
    const { id } = useParams();
    const [patientInputs, setPatientInputs] = useState(patientData);
    const [createPatient] = useCreatePatientMutation();
    const [updatePatient] = useUpdatePatientMutation();
    const { data } = useGetPatientByIdQuery(id);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (data) {
            const tempData = {
                name: data.result.name,
                lastName: data.result.lastName,
                parentName: data.result.parentName,
                personalNumber: data.result.personalNumber,
                address: data.result.address,
                residence: data.result.residence,
                birthday: data.result.birthday,
                bloodgroup: data.result.bloodgroup,
                gender: data.result.gender,
                email: data.result.email,
                phoneNumber: data.result.phoneNumber,
                createdAt: data.result.createdAt,
                updatedAt: data.result.updatedAt,
                isDeleted: data.isDeleted.toLowerCase() === "true",
                occupation: data.result.occupation,
                allergies: data.result.allergies,
            };
            setPatientInputs(tempData);
        }
    }, [data]);

    const handlePatientInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempData = inputHelper(e, patientInputs);
        setPatientInputs(tempData);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("Name", patientInputs.name);
        formData.append("Lastname", patientInputs.lastName);
        formData.append("ParentName", patientInputs.parentName);
        formData.append("PersonalNumber", patientInputs.personalNumber);
        formData.append("Address", patientInputs.address);
        formData.append("Residence", patientInputs.residence);
        formData.append("Birthday", patientInputs.birthday);
        formData.append("BloodGroup", patientInputs.bloodgroup);
        formData.append("Gender", patientInputs.gender);
        formData.append("Email", patientInputs.email);
        formData.append("PhoneNumber", patientInputs.phoneNumber);
        formData.append("CreatedAt", patientInputs.createdAt);
        formData.append("UpdatedAt", patientInputs.updatedAt);
        formData.append("IsDeleted", patientInputs.isDeleted.toString());
        formData.append("Occupation", patientInputs.occupation);
        formData.append("Allergies", patientInputs.allergies);

        let response;


        if (id) {
            formData.append("Id", id);
            console.log("Update department data :", Object.fromEntries(formData.entries()));

            response = await updatePatient({ data: formData, id });

            console.log("Update patient Response: ", response);

            toastNotify("Patient updated successfully", "success");
        } else {
            console.log("Create Patient Data:", Object.fromEntries(formData.entries()));
            response = await createPatient(formData);
            console.log("Create Patient response : ", response);
            toastNotify("Patient created successfully", "success");
        }

        if (response) {
            setLoading(false);
            navigate('/patients');
        }

        setLoading(false);
    }

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
                                    name="lastName"
                                    value={patientInputs.lastName}
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
                                    type="date"
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
                                <Label>Phone Number:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="phoneNumber"
                                    value={patientInputs.phoneNumber}
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
                                <Label>
                                    Is Deleted{" "}
                                    <input
                                        type="checkbox"
                                        name="isDeleted"
                                        checked={patientInputs.isDeleted}
                                        onChange={toggleIsDeleted}
                                    />

                                </Label>
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
                                <BackToProductsButton onClick={() => navigate("/departments")}>
                                    Back to departments
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}


export default PatientUpsert;