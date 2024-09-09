/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { SD_Roles } from '../../app/utility/SD';
import withAuthorization from '../../app/hoc/withAuthorization';
import OrderForm from './OrderForm';
import { useGetOrderByIdQuery } from '../../app/APIs/orderApi';

function OrderUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError } = useGetOrderByIdQuery(id);
    console.log(data);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        return <OrderForm id={id} data={data} />;
    }

    return <div>No order data available.</div>;
}

export default withAuthorization(OrderUpdate, [SD_Roles.ADMINISTRATOR]);