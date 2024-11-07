import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import BotuesiForm from './BotuesiForm';
import { useGetBotuesiByIdQuery } from '../../app/APIs/botuesiApi';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function BotuesiUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError } = useGetBotuesiByIdQuery(id);
    console.log(data);

    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            const fbError = error as FetchBaseQueryError;
            useErrorHandler(fbError, navigate, location.pathname);
        }
    }, [isError, error, navigate]);

    if (isLoading) return <MainLoader />;

    if (data) {
        return <BotuesiForm id={id} data={data} />;
    }

    return <div>No Botuesi data available.</div>;
}

export default BotuesiUpdate;
