import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import { useCreateVisitMutation, useUpdateVisitMutation } from "../../app/APIs/visitApi";
import Visit from "../../app/models/Visit";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import toastNotify from "../../app/helpers/toastNotify";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from "../../app/layout";
import MainLoader from "../../app/common/MainLoader";
import { useGetDoctorsQuery } from "../../app/APIs/doctorApi";
import Doctor from "../../app/models/Doctor";
import Patient from "../../app/models/Patient";
import { useEffect, useState } from "react";
import inputHelper from "../../app/helpers/inputHelper";
import { useNavigate } from "react-router-dom";

interface VisitFormProps {
    id?: string;
    data?: Visit;
}

const visitData: Visit = {
    complaints: "",
    diagnosis: "",
    examinations: "",
    therapy: "",
    requiredAnalysis: "",
    advice: "",
    remarks: "",
    doctorId: "",
    patientId: "",
    id: "",
    createdAt: new Date(), 
    updatedAt: new Date(), 
    doctor: {} as Doctor, 
    patient: {} as Patient 
};

function VisitForm({ id, data }: VisitFormProps) {
    const [visitInputs, setVisitInputs] = useState<Visit>(data || visitData);
    const [createVisit] = useCreateVisitMutation();
    const [updateVisit] = useUpdateVisitMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const { data: patientsData, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null);
    const { data: doctorsData, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(null);

    //useEffect(() => {
    //    if (data) {
    //        const tempData = {
    //            complaints: data.complaints || "",
    //            diagnosis: data.diagnosis || "",
    //            examinations: data.examinations || "",
    //            therapy: data.therapy || "",
    //            requiredAnalysis: data.requiredAnalysis || "",
    //            advice: data.advice || "",
    //            remarks: data.remarks || "",
    //            doctorId: data.doctorId || "",
    //            patientId: data.patientId || "",
    //            id: data.id || "",
    //            createdAt: data.createdAt || new Date(),
    //            updatedAt: data.updatedAt || new Date(),
    //            doctor: data.doctor || {} as Doctor,
    //            patient: data.patient || {} as Patient
    //        };
    //        setVisitInputs(tempData);
    //    }
    //}, [data]);

    const handleVisitInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, visitInputs);
        setVisitInputs(tempData);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Complaints", visitInputs.complaints);
        formData.append("Examinations", visitInputs.examinations);
        formData.append("Diagnosis", visitInputs.diagnosis);
        formData.append("Therapy", visitInputs.therapy);
        formData.append("RequiredAnalysis", visitInputs.requiredAnalysis);
        formData.append("Advice", visitInputs.advice);
        formData.append("Remarks", visitInputs.remarks);
        formData.append("DoctorId", visitInputs.doctorId);
        formData.append("PatientId", visitInputs.patientId);

        const currentLocation = window.location.pathname;
        if (id) {
            formData.append("Id", id);

            const response = await updateVisit({ data: formData, id });

            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Visit updated successfully", "success");
                navigate('/visits');
            }
        } else {
            const response = await createVisit(formData);

            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Visit created successfully", "success");
                navigate('/visits');
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
                            {id ? "Edit Visit" : "Add Visit"}
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
                            ><FormGroup>
                                <Select
                                    name="doctorId"
                                    value={visitInputs.doctorId}
                                    onChange={handleVisitInput}
                                    disabled={doctorsLoading}
                                >
                                    <option value="">Select Doctor</option>
                                    {doctorsData && doctorsData.map((doctor: Doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name} {" "} {doctor.lastName}
                                        </option>
                                    ))}
                                </Select>
                                {doctorsError && <div style={{ color: 'red' }}>Error loading doctors</div>}
                            </FormGroup>

                            <FormGroup>
                                <Select
                                    name="patientId"
                                    value={visitInputs.patientId}
                                    onChange={handleVisitInput}
                                    disabled={patientsLoading}
                                >
                                    <option value="">Select Patient</option>
                                    {patientsData && patientsData.map((patient: Patient) => (
                                        <option key={patient.id} value={patient.id}>
                                            {patient.name} {" "} {patient.lastName}
                                        </option>
                                    ))}
                                </Select>
                                {patientsError && <div style={{ color: 'red' }}>Error loading patients</div>}
                            </FormGroup>
                            <FormGroup>
                                <Label>Complaints</Label>
                                <Input
                                    type="text"
                                    name="complaints"
                                    value={visitInputs.complaints}
                                    onChange={handleVisitInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Diagnosis</Label>
                                <Input
                                    type="text"
                                    name="diagnosis"
                                    value={visitInputs.diagnosis}
                                    onChange={handleVisitInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Examinations</Label>
                                <Input
                                    type="text"
                                    name="examinations"
                                    value={visitInputs.examinations}
                                    onChange={handleVisitInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Required Analysis</Label>
                                <Input
                                    type="text"
                                    name="requiredAnalysis"
                                    value={visitInputs.requiredAnalysis}
                                    onChange={handleVisitInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Therapy</Label>
                                <Input
                                    type="text"
                                    name="therapy"
                                    value={visitInputs.therapy}
                                    onChange={handleVisitInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Advice</Label>
                                <Input
                                    type="text"
                                    name="advice"
                                    value={visitInputs.advice}
                                    onChange={handleVisitInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Remarks</Label>
                                <Input
                                    type="text"
                                    name="remarks"
                                    value={visitInputs.remarks}
                                    onChange={handleVisitInput}
                                />
                            </FormGroup>
                            

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/visits")}>
                                    Back to Visits
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}
export default VisitForm;
