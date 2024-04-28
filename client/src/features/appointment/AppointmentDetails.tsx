/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useGetAppointmentByIdQuery } from "../../app/APIs/appointmentApi";
import { useGetDoctorByIdQuery } from "../../app/APIs/doctorApi";
import { useGetPatientByIdQuery } from "../../app/APIs/patientApi";
import { formatDate } from "../../app/utility/formatDate";
import { WrapperContainer, MainContainer, LeftContainer, SectionTitle, Attribute, Label, Value} from "../../app/common/styledComponents/details";
import { Header, SidePanel } from "../../app/layout";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function AppointmentDetails() {
    
    const { id } = useParams();
    const { data: appointmentData, isLoading: isAppointmentLoading, error: appointmentError, isError: isAppointmentError } = useGetAppointmentByIdQuery(id);
    const { data: doctorData, isLoading: isDoctorLoading, error: doctorError, isError: isDoctorError } = useGetDoctorByIdQuery(appointmentData?.doctorId || null);
    const { data: patientData, isLoading: isPatientLoading, error: patientError, isError: isPatientError } = useGetPatientByIdQuery(appointmentData?.patientId || null);
    const navigate = useNavigate();
   

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return null;
    }

    const handleDataError = (error) => {
        const fbError = error as FetchBaseQueryError;
        useErrorHandler(fbError, navigate, location.pathname);
    };

    if (isAppointmentError || isDoctorError || isPatientError) {
        handleDataError(appointmentError || doctorError || patientError);
        return null;
    }

    if (isAppointmentLoading || isDoctorLoading || isPatientLoading) return <MainLoader />;

    if (appointmentData && doctorData && patientData) {
        const appointment = appointmentData;
        const doctor = doctorData;
        const patient = patientData;

        return (
            <>
                <Header />
                <SidePanel />

                <MainContainer>
                    <WrapperContainer>
                        <LeftContainer>
                            <SectionTitle>Appointment Details</SectionTitle>
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
                                <Label>Check In Date</Label>
                                <Value>{formatDate(appointment.checkInDate)}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Check Out Date</Label>
                                <Value>{formatDate(appointment.checkOutDate)}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Doctor</Label>
                                <Value>{doctor.name}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Patient</Label>
                                <Value>{patient.name}</Value>
                            </Attribute>
                        </LeftContainer>

                        {/*<RightContainer>*/}
                        {/*    <SectionTitle>Additional Information</SectionTitle>*/}
                        {/*    */}{/* Add more attributes here if needed */}
                        {/*</RightContainer>*/}
                    </WrapperContainer>
                </MainContainer>
            </>
        );
    }
    return null;
}

export default AppointmentDetails;
