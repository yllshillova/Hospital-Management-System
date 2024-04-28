/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import PatientForm from './PatientForm';
import { useGetPatientByIdQuery } from '../../app/APIs/patientApi';
import MainLoader from '../../app/common/MainLoader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import useErrorHandler from '../../app/helpers/useErrorHandler';

function PatientUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError } = useGetPatientByIdQuery(id);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        return <PatientForm id={id} data={data} />;
    }

    return <div>No patient data available.</div>;
}

export default PatientUpdate;