import { useCreateVisitMutation, useUpdateVisitMutation } from "../../app/APIs/visitApi";
import Visit from "../../app/models/Visit";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import toastNotify from "../../app/helpers/toastNotify";
import { AssignToRoomButton, BackToProductsButton, ButtonText, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from "../../app/layout";
import MainLoader from "../../app/common/MainLoader";
import Doctor from "../../app/models/Doctor";
import Patient from "../../app/models/Patient";
import { useState } from "react";
import inputHelper from "../../app/helpers/inputHelper";
import { useNavigate } from "react-router-dom";
import { useAssignPatientMutation } from "../../app/APIs/roomApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBedPulse } from "@fortawesome/free-solid-svg-icons/faBedPulse";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import { useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";
import { useGetScheduledAppointmentsQuery } from "../../app/APIs/appointmentApi";
import { ErrorMessage, BackButton, ErrorTitleRow, ErrorIcon, Message } from "../../app/common/styledComponents/table";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import Appointment from "../../app/models/Appointment";
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
    const { data: appointmentsData, isLoading: appointmentsLoading, error: appointmentsError } = useGetScheduledAppointmentsQuery(null);
    console.log(appointmentsData);

    const scheduledPatientIds = appointmentsData?.map((appointment: Appointment) => appointment.patientId) || [];
    const scheduledPatients = patientsData?.filter((patient: Patient) => scheduledPatientIds.includes(patient.id)) || [];

    const [assignPatientToRoom, { isLoading: assigningPatient }] = useAssignPatientMutation();

    const doctorId: string = useSelector(
        (state: RootState) => state.auth.id
    );

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
        formData.append("DoctorId", doctorId);
        formData.append("PatientId", visitInputs.patientId);

        const currentLocation = window.location.pathname;
        if (id) {
            formData.append("Id", id);

            const response = await updateVisit({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Visit has been updated", "success");
                navigate('/visits');
            }
        } else {
            const response = await createVisit(formData);

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Visit has been created", "success");
                navigate('/visits');
            }
        }
        setLoading(false);
    };

    const handleAssignToRoom = async (): Promise<void> => {
        if (!visitInputs.patientId) {
            toastNotify("Please select a patient first", "warning");
            return;
        }

        try {
            const response = await assignPatientToRoom({ patientId: visitInputs.patientId, doctorId: doctorId });
            if ('error' in response) {
                toastNotify("Failed to assign patient to room", "error");
            } else {
                toastNotify("Patient has been assigned to room", "success");
            }
        } catch (error) {
            toastNotify("An error occurred while assigning patient to room", "error");
        }
    };

    let content;

    if (appointmentsLoading || patientsLoading) {
        content = <MainLoader />;
    } else if (appointmentsError || patientsError) {
        const errorMessage = ((appointmentsError as FetchBaseQueryError)?.data || (patientsError as FetchBaseQueryError)?.data) as string;

        return (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <Message>{errorMessage}</Message>
                    </ErrorTitleRow>
                    <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                </ErrorMessage>
            </>
        );
    }


    else {
        content = (
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
                            >


                                <FormGroup>
                                    <Select
                                        name="patientId"
                                        value={visitInputs.patientId}
                                        onChange={handleVisitInput}
                                        disabled={patientsLoading}
                                    >
                                        <option value="">Select Patient</option>
                                        {scheduledPatients && scheduledPatients.map((patient: Patient) => (
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


                                <AssignToRoomButton onClick={handleAssignToRoom} disabled={assigningPatient}>
                                    <FontAwesomeIcon icon={faBedPulse} />
                                    <ButtonText>Assign to Room</ButtonText>
                                </AssignToRoomButton>

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
}
export default withAuthorization(VisitForm, [SD_Roles.DOCTOR]);
