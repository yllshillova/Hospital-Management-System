/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { useGetVisitByIdQuery } from '../../app/APIs/visitApi';
import VisitForm from '../visit/VisitForm';
import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';

function VisitUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError } = useGetVisitByIdQuery(id);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        return <VisitForm id={id} data={data} />;
    }

    return <div>No visit data available.</div>;
}

export default  withAuthorization( VisitUpdate , [SD_Roles.DOCTOR]);