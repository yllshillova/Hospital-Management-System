/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetPatientByIdQuery } from "../../app/APIs/patientApi";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";

function PatientDetails() {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetPatientByIdQuery(id);
    const navigate = useNavigate();
    const location = useLocation();

    if (isLoading) return <MainLoader />;

    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }


    if (data) {
        const patient = data;

        return (
            <div>
                <h2>Patient Details</h2>
                <p>Id: {patient.id}</p>
                <p>Name: {patient.name}</p>
                <p>LastName: {patient.lastName}</p>
                <p>ParentName: {patient.parentName}</p>
                <p>PersonalNumber: {patient.personalNumber}</p>
                <p>Address: {patient.address}</p>
                <p>Residence: {patient.residence}</p>
                <p>Birthday: {patient.birthday}</p>
                <p>BloodGroup: {patient.bloodgroup}</p>
                <p>Gender: {patient.gender}</p>
                <p>Email: {patient.email}</p>
                <p>PhoneNumber: {patient.phoneNumber}</p>
                <p>Created At: {new Date(patient.createdAt).toLocaleDateString()}</p>
                <p>Updated At: {new Date(patient.updatedAt).toLocaleDateString()}</p>
                <p>Status: {patient.isDeleted ? "Active" : "Passive"}</p>
                <p>Occupation: {patient.occupation}</p>
                <p>Allergies: {patient.allergies}</p>
            </div>
        );
    }
    return null;
}

export default PatientDetails;
