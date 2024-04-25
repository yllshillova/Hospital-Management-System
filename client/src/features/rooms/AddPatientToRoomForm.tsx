import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useAddPatientToRoomMutation } from "../../app/APIs/patientApi";  //kto duhet me shtu ne API
//import toastNotify from "../../app/helpers/toastNotify";
//import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { BackToProductsButton, Form, FormContainer, FormGroup, Input, Label, OuterContainer, SubmitButton, Title } from "../../app/common/styledComponents/upsert";

const initialFormData = {
    //patientId: "",
    //roomId: "",
    patientName: "",
    nrDhomes: ""
};

function AddPatientToRoomForm() {
    const [formData, setFormData] = useState({ ...initialFormData/*, nrDhomes*/ });
    //const [addPatientToRoom, { isLoading }] = useAddPatientToRoomMutation(); 
    const navigate = useNavigate();
    //const { id:nrDhomes } = useParams(); //merr id e dhomes nga url

    //useEffect(() => {
    //    setFormData((prevData) => ({ ...prevData, nrDhomes })); // Përditësimi i numrit të dhomës në formë kur ndryshon ID-ja e dhomës
    //}, [nrDhomes]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    //const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //    e.preventDefault();
    //    if (!formData.patientId || !formData.roomId) {
    //        toastNotify("Please fill in all required fields.", "error");
    //        return;
    //    }

    //    try {
    //        //const response = await addPatientToRoom(formData);
    //        if (response) {
    //            toastNotify("Patient added to room successfully", "success");
    //            navigate('/patients');
    //        }
    //    } catch (error) {
    //        console.error("Error adding patient to room:", error);
    //        toastNotify("Failed to add patient to room. Please try again later.", "error");
    //    }
    //};

    return (
        <>
            <Header />
            <SidePanel />
            <OuterContainer>
                <FormContainer>
                    {/*   {isLoading && <MainLoader />}*/}
                    <Title>Add Patient to Room</Title>
                    <Form method="post" >{/*onSubmit={handleSubmit}*/}
                        <FormGroup>
                            <Label>Patient Name:</Label>
                            <Input
                                type="text"
                                required
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleInputChange}
                            />
                            {/*<Label>Patient ID:</Label>*/}
                            {/*<Input*/}
                            {/*    type="text"*/}
                            {/*    required*/}
                            {/*    name="patientId"*/}
                            {/*    value={formData.patientId}*/}
                            {/*    onChange={handleInputChange}*/}
                            {/*/>*/}
                        </FormGroup>
                        <FormGroup>
                            <Label>Room Number:</Label>
                            <Input
                                type="text"
                                name="nrDhomes"
                                value={formData.nrDhomes}
                                onChange={handleInputChange}
                            />
                            {/*<Label>Room ID:</Label>*/}
                            {/*<Input*/}
                            {/*    type="text"*/}
                            {/*    required*/}
                            {/*    name="roomId"*/}
                            {/*    value={formData.roomId}*/}
                            {/*    onChange={handleInputChange}*/}
                            {/*/>*/}
                        </FormGroup>
                        <SubmitButton type="submit">
                            Add Patient to Room
                        </SubmitButton>
                        <BackToProductsButton onClick={() => navigate("/room/:id")}>
                            Back to Patients
                        </BackToProductsButton>
                    </Form>
                </FormContainer>
            </OuterContainer>
        </>
    );
}

export default AddPatientToRoomForm;