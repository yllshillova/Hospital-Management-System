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
    const { data: appointment, isLoading, error, isError/*, isLoading: isAppointmentLoading, error: appointmentError, isError: isAppointmentError*/ } = useGetAppointmentByIdQuery(id);
    const { data: doctorData, isLoading: isDoctorLoading, error: doctorError/*, isError: isDoctorError*/ } = useGetDoctorByIdQuery(appointment?.doctorId || null);
    const { data: patientData, isLoading: isPatientLoading, error: patientError/*, isError: isPatientError*/ } = useGetPatientByIdQuery(appointment?.patientId || null);
    const navigate = useNavigate();
    const location = useLocation();

    //if (!isValidGuid(id as string)) {
    //    navigate('/not-found');
    //    return null;
    //}

    //const handleDataError = (error) => {
    //    const fbError = error as FetchBaseQueryError;
    //    useErrorHandler(fbError, navigate, location.pathname);
    //};

    //if (isAppointmentError || isDoctorError || isPatientError) {
    //    handleDataError(appointmentError || doctorError || patientError);
    //    return null;
    //}

    //if (isAppointmentLoading || isDoctorLoading || isPatientLoading) return <MainLoader />;

    //if (appointmentData && doctorData && patientData) {
    //    const appointment = appointmentData;
    //    //const doctor = doctorData;
    //    //const patient = patientData;



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
                                <Value>{appointment.checkInDate}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>CheckOutDate</Label>
                                <Value>{appointment.checkOutDate}</Value>
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



                        {/*<>*/}
                        {/*    <div>*/}
                        {/*        <h2>Doctor Details</h2>*/}
                        {/*        <p>Id: {doctor.id}</p>*/}
                        {/*        <p>Name: {doctor.name}</p>*/}
                        {/*        <p>Last Name: {doctor.lastName}</p>*/}
                        {/*        <p>Specialization: {doctor.specialization}</p>*/}
                        {/*        <p>Residence: {doctor.residence}</p>*/}
                        {/*        <p>Address: {doctor.address}</p>*/}
                        {/*        <p>Gender: {doctor.gender}</p>*/}
                        {/*        <p>Birthday: {new Date(doctor.birthday).toLocaleDateString()}</p>*/}
                        {/*        <p>DepartmentId: {doctor.departmentId}</p>*/}
                        {/*        <p>Created At: {new Date(doctor.createdAt).toLocaleDateString()}</p>*/}
                        {/*        <p>Updated At: {new Date(doctor.updatedAt).toLocaleDateString()}</p>*/}
                        {/*        <p>IsDeleted: {doctor.isDeleted}</p>*/}
                        {/*    </div>*/}
                        {/*</>*/}

                        {/*<RightContainer>*/}
                        {/*    <SectionTitle>Personal Information</SectionTitle>*/}
                        {/*    <LabelsRow>*/}
                        {/*        <Label>Address</Label>*/}
                        {/*        <Label>Email</Label>*/}
                        {/*    </LabelsRow>*/}
                        {/*    <ValuesRow>*/}
                        {/*        <Value>{doctor.address}</Value>*/}
                        {/*        <Value>{doctor.email}</Value>*/}
                        {/*    </ValuesRow>*/}

                        {/*    <LabelsRow>*/}
                        {/*        <Label>Gender</Label>*/}
                        {/*        <Label>Birthday</Label>*/}
                        {/*    </LabelsRow>*/}
                        {/*    <ValuesRow>*/}
                        {/*        <Value>{doctor.gender}</Value>*/}
                        {/*        <Value>{formatDate(doctor.birthday)}</Value>*/}
                        {/*    </ValuesRow>*/}
                        {/*    <LabelsRow>*/}
                        {/*        */}{/*<Label>Allergies</Label>*/}
                        {/*        <Label>Created At</Label>*/}
                        {/*        <Label>Updated At</Label>*/}
                        {/*    </LabelsRow>*/}
                        {/*    <ValuesRow>*/}
                        {/*        */}{/*<Value>Lactose , Paracetamol Lactose</Value>*/}
                        {/*        <Value>{formatDate(doctor.createdAt)}</Value>*/}
                        {/*        <Value>{formatDate(doctor.updatedAt)}</Value>*/}
                        {/*    </ValuesRow>*/}

                        {/*</RightContainer>*/}
                    </WrapperContainer>

                    {/*<AdditionalInfoContainer>*/}
                    {/*    <SectionTitle>Additional Information</SectionTitle>*/}
                    {/*    <LabelsRow>*/}
                    {/*        <Label>Created At</Label>*/}
                    {/*        <Label></Label>*/}
                    {/*        <Label></Label>*/}
                    {/*        <Label>Updated At</Label>*/}
                    {/*    </LabelsRow>*/}
                    {/*    <ValuesRow>*/}
                    {/*        <Value>{formatDate(doctor.createdAt)}</Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value>{formatDate(doctor.updatedAt)}</Value>*/}
                    {/*    </ValuesRow>*/}
                    {/*</AdditionalInfoContainer>*/}
                </MainContainer>
            </>
        );


    }
    return null;
}

export default AppointmentDetails;
