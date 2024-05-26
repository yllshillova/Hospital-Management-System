/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
//import DoctorForm from './DoctorForm';
//import { useGetDoctorByIdQuery } from '../../app/APIs/doctorApi';
import MainLoader from '../../app/common/MainLoader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { useGetEmergencyContactByIdQuery } from '../../app/APIs/emergencyContactApi';
import EmergencyContactForm from './emergencyContactForm';

function EmergencyContactUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError } = useGetEmergencyContactByIdQuery(id);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        console.log(data);
        return <EmergencyContactForm id={id} data={data} />;
    }

    return <div>No emergencyContact data available.</div>;
}

export default EmergencyContactUpdate;