/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from "react-router-dom";
import { useGetDepartmentByIdQuery } from "../../app/APIs/departmentApi";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function DepartmentDetails() {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetDepartmentByIdQuery(id);
    const navigate = useNavigate();

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate);
    }

    if (isLoading) return <MainLoader />;





    if (data) {
        const department = data;
        return (
            <>
                <div>
                    <h2>Department Details</h2>
                    <p>Id: {department.id}</p>
                    <p>Name: {department.name}</p>
                    <p>Status: {department.isDeleted ? "Active" : "Passive"}</p>
                    <p>Created At: {new Date(department.createdAt).toLocaleDateString()}</p>
                    <p>Updated At: {new Date(department.updatedAt).toLocaleDateString()}</p>
                </div>
            </>
        );
    }
    return null;
}

export default DepartmentDetails;
