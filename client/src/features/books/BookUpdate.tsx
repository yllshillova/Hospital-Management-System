/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { SD_Roles } from '../../app/utility/SD';
import withAuthorization from '../../app/hoc/withAuthorization';
import { useGetBookByIdQuery } from '../../app/APIs/bookApi';
import BookForm from './BookForm';

function BookUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError } = useGetBookByIdQuery(id);
    console.log(data);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        return <BookForm id={id} data={data} />;
    }

    return <div>No Book data available.</div>;
}

export default withAuthorization(BookUpdate, [SD_Roles.ADMINISTRATOR]);