import { useParams } from 'react-router-dom';
import DoctorForm from './DoctorForm';
import { useGetDoctorByIdQuery } from '../../app/APIs/doctorApi';
import MainLoader from '../../app/common/MainLoader';

function DoctorUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useGetDoctorByIdQuery(id);

    if (isLoading) {
        return <MainLoader />;
    }

    if (error) {
        // Handle error state (e.g., show an error message)
        return <div>Error loading doctor data.</div>;
    }

    if (data) {
        // Pass the doctor's data and ID to the DoctorForm component
        return <DoctorForm id={id} data={data} />;
    }

    // Fallback for unexpected cases (e.g., no data)
    return <div>No doctor data available.</div>;
}

export default DoctorUpdate;