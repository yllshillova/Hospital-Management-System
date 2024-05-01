/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useGetAppointmentByIdQuery } from "../../app/APIs/appointmentApi";
//import { formatDate } from "../../app/utility/formatDate";
import { Header, SidePanel } from "../../app/layout";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Title } from "../../app/common/styledComponents/upsert";
import Patient from "../../app/models/Patient";
import Doctor from "../../app/models/Doctor";
import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import { useGetDoctorsQuery } from "../../app/APIs/doctorApi";
import { formatDateTimeLocal } from "../../app/utility/formatDate";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function AppointmentDetails() {
    
    const { id } = useParams<string>();
    const { data, isLoading, error, isError} = useGetAppointmentByIdQuery(id);
    const { data: doctorsData, isLoading: doctorsLoading, error: doctorsError, isError: doctorsIsError } = useGetDoctorsQuery(null);
    const { data: patientsData, isLoading: patientsLoading, error: patientsError, isError: patientsIsError } = useGetPatientsQuery(null);
    const navigate = useNavigate();
    const location = useLocation();

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }
    const fbError = error as FetchBaseQueryError;

    if (isError || doctorsIsError || patientsIsError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }
    if (isLoading || patientsLoading || doctorsLoading) return <MainLoader />;

    if (data) {
        const patient = patientsData?.find((patient: Patient) => patient.id === data.patientId);
        const doctor = doctorsData?.find((doctor: Doctor) => doctor.id === data.doctorId);

        return (
            <>
                <Header />
                <SidePanel />

                <OuterContainer>
                    <Container>
                        <FormContainer >
                            {isLoading && <MainLoader />}
                            <Title>
                                Details of Appointment X
                            </Title>

                            <Form>
                                <FormGroup>
                                    <Label>Check In Date</Label>
                                    <Input
                                        type="datetime-local"
                                        value={formatDateTimeLocal(data.checkInDate)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Check Out Date</Label>
                                    <Input
                                        type="datetime-local"
                                        value={formatDateTimeLocal(data.checkOutDate)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Status</Label>
                                    <Input
                                        type="text"
                                        value={data.status}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Reason</Label>
                                    <Input
                                        type="text"
                                        value={data.reason}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Notes</Label>
                                    <Input
                                        type="Notes"
                                        value={data.notes}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Doctor</Label>
                                    <Input
                                        type="text"
                                        value={`${doctor.name} ${doctor.lastName}`}
                                    />
                                    {doctorsError && <div style={{ color: 'red' }}>Error loading doctor</div>}
                                </FormGroup>

                                <FormGroup>
                                    <Label>Patient</Label>
                                    <Input
                                        type="text"
                                        value={`${patient.name} ${patient.lastName}`}
                                    />
                                    {patientsError && <div style={{ color: 'red' }}>Error loading patient</div>}
                                </FormGroup>

                                <ButtonsContainer>
                                    <BackToProductsButton onClick={() => navigate("/visits")}>
                                        Back to Appointments
                                    </BackToProductsButton>
                                </ButtonsContainer>
                            </Form>
                        </FormContainer>
                    </Container>
                </OuterContainer>
            </>
        );


    }
    return null;
}

export default AppointmentDetails;
