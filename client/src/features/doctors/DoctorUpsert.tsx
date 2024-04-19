import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { useCreateDoctorMutation, useGetDoctorByIdQuery, useUpdateDoctorMutation } from "../../app/APIs/doctorApi";
import { SD_Genders } from "../../app/utility/SD";

const doctorData = {
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


const genders = [
    SD_Genders.Male,
    SD_Genders.Female
];




function DoctorUpsert() {
    const { id } = useParams();
    const [doctorInputs, setDoctorInputs] = useState(doctorData);
    const [createDoctor] = useCreateDoctorMutation();
    const [updateDoctor] = useUpdateDoctorMutation();
    const { data } = useGetDoctorByIdQuery(id);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (data) {
            const tempData = {
                name: data.name,
                lastName: data.lastName,
                specialization: data.specialization,
                address: data.address,
                residence: data.residence,
                birthday: data.birthday,
                gender: data.gender,
                email: data.email,
                isDeleted: data.isDeleted.toLowerCase() === "true",
                departmentId: data.departmentId,
            };
            setDoctorInputs(tempData);
        }
    }, [data]);

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

   const handleDoctorInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const tempData = inputHelper(e, doctorInputs);
    
    if (e.target.name === 'birthday') {
        const formattedBirthday = formatBirthday(tempData.birthday);
        if (formattedBirthday !== undefined) {
            tempData.birthday = formattedBirthday;
        }
        //TODO: to validate the date with fluent validation
        console.log("Invalid birthday date!")
    }
    
    setDoctorInputs(tempData);
};

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
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


        let response;


        if (id) {
            formData.append("Id", id);
            console.log("Update department data :", Object.fromEntries(formData.entries()));

            response = await updateDoctor({ data: formData, id });

            console.log("Update department Response: ", response);

            toastNotify("Department updated successfully", "success");
        } else {
            console.log("Create Department Data:", Object.fromEntries(formData.entries()));
            response = await createDoctor(formData);
            console.log("Create Department response : ", response);
            toastNotify("Department created successfully", "success");
        }

        if (response) {
            setLoading(false);
            navigate('/doctors');
        }

        setLoading(false);
    }

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
                        {<Title>
                            {id ? "Edit Doctor" : "Add Doctor"}
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
                                    value={doctorInputs.name}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="lastName"
                                    value={doctorInputs.lastName}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Specialization:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="specialization"
                                    value={doctorInputs.specialization}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup><FormGroup>
                                <Label>Address:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="address"
                                    value={doctorInputs.address}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Residence:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="residence"
                                    value={doctorInputs.residence}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Birthday:</Label>
                                <Input
                                    type="date"
                                    required
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
                                    required
                                    name="email"
                                    value={doctorInputs.email}
                                    onChange={handleDoctorInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>DepartmentId:</Label>
                                <Input
                                    type="text"
                                    required
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


export default DoctorUpsert;