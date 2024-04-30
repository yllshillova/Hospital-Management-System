/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useGetAppointmentByIdQuery } from "../../app/APIs/appointmentApi";
import { useGetDoctorByIdQuery } from "../../app/APIs/doctorApi";
import { useGetPatientByIdQuery } from "../../app/APIs/patientApi";
//import { formatDate } from "../../app/utility/formatDate";
import { WrapperContainer, MainContainer, LeftContainer, SectionTitle, Attribute, Label, Value} from "../../app/common/styledComponents/details";
import { Header, SidePanel } from "../../app/layout";
import MiniLoader from "../../app/common/MiniLoader";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function AppointmentDetails() {
    
    const { id } = useParams<string>();
    const { data: appointment, isLoading, error, isError} = useGetAppointmentByIdQuery(id);
    const { data: doctorData, isLoading: isDoctorLoading, error: doctorError } = useGetDoctorByIdQuery(appointment?.doctorId || null);
    const { data: patientData, isLoading: isPatientLoading, error: patientError} = useGetPatientByIdQuery(appointment?.patientId || null);
    const navigate = useNavigate();
    const location = useLocation();

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }
    if (isLoading) return <MainLoader />;

    if (appointment && appointment.doctorId && appointment.patientId) {



        return (
            <>
                <Header />
                <SidePanel />

                <MainContainer>
                    <WrapperContainer>

                        <LeftContainer>
                            <SectionTitle>Details of appointment: {appointment.status}</SectionTitle>
                            {/*<Attribute>*/}
                            {/*    <label style={{ fontWeight: "bold", color: "#009F6B" }}>{doctor.isDeleted === "True" ? "Passive" : "Active"} </label>*/}
                            {/*</Attribute>*/}
                            <Attribute>
                                <Label>CheckInDate</Label>
                                <Value>{new Date(appointment.checkInDate!).toLocaleString()}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>CheckOutDate</Label>
                                <Value>{new Date(appointment.checkOutDate!).toLocaleString()}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Status</Label>
                                <Value>{appointment.status}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Reason</Label>
                                <Value>{appointment.reason}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Notes</Label>
                                <Value>{appointment.notes}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Doctor</Label>
                                <Value> {isDoctorLoading ? (
                                    <MiniLoader />
                                ) : doctorData ? (
                                    doctorData.name
                                ) : doctorError ? (
                                    doctorError.data
                                ) : (
                                    "Doctor not found!"
                                )}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Patient</Label>
                                <Value> {isPatientLoading ? (
                                    <MiniLoader />
                                ) : patientData ? (
                                    patientData.name
                                ) : patientError ? (
                                    patientError.data
                                ) : (
                                    "Patient not found!"
                                )}</Value>
                            </Attribute>
                        </LeftContainer>
                    </WrapperContainer>
                </MainContainer>
            </>
        );


    }
    return null;
}

export default AppointmentDetails;
