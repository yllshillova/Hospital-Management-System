/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import NurseForm from './NurseForm';
import { useGetNurseByIdQuery } from '../../app/APIs/nurseApi';
import MainLoader from '../../app/common/MainLoader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import useErrorHandler from '../../app/helpers/useErrorHandler';

function NurseUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError } = useGetNurseByIdQuery(id);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        console.log(data);
        return <NurseForm id={id} data={data} />;
    }

    return <div>No nurse data available.</div>;
}

export default NurseUpdate;