/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetPatientByIdQuery } from "../../app/APIs/patientApi";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function PatientDetails() {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetPatientByIdQuery(id);
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





    if (data) {
        const patient = data;
        console.log(patient.isDeleted);
        return (
            <>
                <div>
                    <h2>Patient Details</h2>
                    <p>Id: {patient.id}</p>
                    <p>Name: {patient.name}</p>
                    <p>Last Name: {patient.lastName}</p>
                    <p>Parent Name: {patient.parentName}</p>
                    <p>Personal Number: {patient.personalNumber}</p>
                    <p>Address: {patient.address}</p>
                    <p>Residence: {patient.residence}</p>
                    <p>Birthday: {new Date(patient.birthday).toLocaleDateString()}</p>
                    <p>BloodGroup: {patient.bloodgroup}</p>
                    <p>Gender: {patient.gender}</p>
                    <p>Email: {patient.email}</p>
                    <p>PhoneNumber: {patient.phoneNumber}</p>
                    <p>IsDeleted: {patient.isDeleted}</p>
                    <p>Created At: {new Date(patient.createdAt).toLocaleDateString()}</p>
                    <p>Updated At: {new Date(patient.updatedAt).toLocaleDateString()}</p>
                    <p>Occupation: {patient.occupation}</p>
                    <p>Allergies: {patient.allergies}</p>
                </div>
            </>
        );
    }
    return null;
}

export default PatientDetails;
