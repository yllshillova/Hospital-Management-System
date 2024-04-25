/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetAppointmentByIdQuery } from "../../app/APIs/appointmentApi";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function AppointmentDetails() {
    const { id } = useParams();
    const { data: appointmentData, isLoading: isAppointmentLoading, error: appointmentError, isError: isAppointmentError } = useGetAppointmentByIdQuery(id);
    //const { data: doctorData, isLoading: isDoctorLoading, error: doctorError, isError: isDoctorError } = useGetDoctorByIdQuery(appointmentData?.doctorId || null);
    //const { data: patientData, isLoading: isPatientLoading, error: patientError, isError: isPatientError } = useGetPatientByIdQuery(appointmentData?.patientId || null);
    const navigate = useNavigate();
    const location = useLocation();

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }

    const fbError = appointmentError as FetchBaseQueryError;

    if (isAppointmentError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isAppointmentLoading /*|| isDoctorLoading || isPatientLoading*/) return <MainLoader />;

    if (appointmentData /*&& doctorData && patientData*/) {
        const appointment = appointmentData;
        //const doctor = doctorData;
        //const patient = patientData;

        return (
            <>
                <div>
                    <h2>Appointment Details</h2>
                    <p>Id: {appointment.id}</p>
                    <p>Created At: {new Date(appointment.createdAt).toLocaleDateString()}</p>
                    <p>Updated At: {new Date(appointment.updatedAt).toLocaleDateString()}</p>
                    <p>CheckInDate: {new Date(appointment.checkInDate).toLocaleDateString()}</p>
                    <p>CheckOutDate: {new Date(appointment.checkOutDate).toLocaleDateString()}</p>
                    <p>Status: {appointment.status}</p>
                    <p>Reason: {appointment.reason}</p>
                    <p>Notes: {appointment.notes}</p>
                    {/*<p>Doctor: {doctor.name}</p>*/}
                    {/*<p>Patient: {patient.name}</p>*/}
                </div>
            </>
        );
    }
    return null;
}

export default AppointmentDetails;


