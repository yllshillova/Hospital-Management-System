import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateDepartmentMutation, useGetDepartmentByIdQuery, useUpdateDepartmentMutation } from "../../app/APIs/departmentApi";
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, SubmitButton, Title } from "../../app/common/styledComponents/upsert";

const departmentData = {
    name: "",
    isDeleted: false
};
function DepartmentUpsert() {
    const { id } = useParams();
    const [departmentInputs, setDepartmentInputs] = useState(departmentData);
    const [createDepartment] = useCreateDepartmentMutation();
    const [updateDepartment] = useUpdateDepartmentMutation();
    const { data } = useGetDepartmentByIdQuery(id);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (data) {
            const tempData = {
                name: data.name,
                isDeleted: data.isDeleted.toLowerCase() === "true",
            };
            setDepartmentInputs(tempData);
        }
    }, [data]);

    const handleDepartmentInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempData = inputHelper(e, departmentInputs);
        setDepartmentInputs(tempData);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();

        formData.append("Name", departmentInputs.name);
        formData.append("IsDeleted", departmentInputs.isDeleted.toString());

        let response;


        if (id) {
            formData.append("Id", id);
            console.log("Update department data :", Object.fromEntries(formData.entries()));

            response = await updateDepartment({ data: formData, id });

            console.log("Update department Response: ", response);

            toastNotify("Department updated successfully", "success");
        } else {
            console.log("Create Department Data:", Object.fromEntries(formData.entries()));
            response = await createDepartment(formData);
            console.log("Create Department response : ", response);
            toastNotify("Department created successfully", "success");
        }

        if (response) {
            setLoading(false);
            navigate('/departments');
        }

        setLoading(false);
    }

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
                        {<Title>
                            {id ? "Edit Department" : "Add Department"}
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
                                    value={departmentInputs.name}
                                    onChange={handleDepartmentInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Is Deleted{" "}
                                    <input
                                        type="checkbox"
                                        name="isDeleted"
                                        checked={departmentInputs.isDeleted}
                                        onChange={toggleIsDeleted}
                                    />
                                    
                                </Label>
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


export default DepartmentUpsert;