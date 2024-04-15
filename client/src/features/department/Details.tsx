import { useParams } from "react-router-dom";
import { useGetDepartmentByIdQuery } from "../../app/APIs/departmentApi";
import MainLoader from "../../app/common/MainLoader";

function DepartmentDetails() {
    const { id } = useParams();
    const { data, isLoading, error } = useGetDepartmentByIdQuery(id);

    if (isLoading) return <MainLoader />;

    if (error) return `Error while displaying department details for department with id : ${id}`;

    const department = data;

    return (
        <div>
            <h2>Department Details</h2>
            <p>ID: {department.id}</p>
            <p>Name: {department.name}</p>
            <p>Is Deleted: {department.isDeleted ? "Yes" : "No"}</p>
            <p>Created At: {new Date(department.createdAt).toLocaleDateString()}</p>
            <p>Updated At: {new Date(department.updatedAt).toLocaleDateString()}</p>
        </div>
    );
}

export default DepartmentDetails;