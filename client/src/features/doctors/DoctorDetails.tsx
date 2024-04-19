/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useGetDoctorByIdQuery } from "../../app/APIs/doctorApi";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function DoctorDetails() {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetDoctorByIdQuery(id);
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
        const doctor = data;
        console.log(doctor.isDeleted);
        return (
            <>
                <div>
                    <h2>Doctor Details</h2>
                    <p>Id: {doctor.id}</p>
                    <p>Name: {doctor.name}</p>
                    <p>Last Name: {doctor.lastName}</p>
                    <p>Specialization: {doctor.specialization}</p>
                    <p>Residence: {doctor.residence}</p>
                    <p>Address: {doctor.address}</p>
                    <p>Gender: {doctor.gender}</p>
                    <p>Birthday: {new Date(doctor.birthday).toLocaleDateString()}</p>
                    <p>DepartmentId: {doctor.departmentId}</p>
                    <p>Created At: {new Date(doctor.createdAt).toLocaleDateString()}</p>
                    <p>Updated At: {new Date(doctor.updatedAt).toLocaleDateString()}</p>
                    <p>IsDeleted: {doctor.isDeleted}</p>
                </div>
            </>
        );
    }
    return null;
}

export default DoctorDetails;