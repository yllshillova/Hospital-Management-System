import { useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import DepartmentForm from './DepartmentForm';
import { useGetDepartmentByIdQuery } from '../../app/APIs/departmentApi';

function DepartmentUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useGetDepartmentByIdQuery(id);

    if (isLoading) {
        return <MainLoader />;
    }

    if (error) {
        // Handle error state (e.g., show an error message)
        return <div>Error loading doctor data.</div>;
    }

    if (data) {
        // Pass the doctor's data and ID to the DoctorForm component
        return <DepartmentForm id={id} data={data} />;
    }

    // Fallback for unexpected cases (e.g., no data)
    return <div>No doctor data available.</div>;
}

export default DepartmentUpdate;