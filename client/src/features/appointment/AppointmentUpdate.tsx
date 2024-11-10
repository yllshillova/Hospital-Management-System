/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import AppointmentForm from './AppointmentForm';
import { useGetAppointmentByIdQuery } from '../../app/APIs/appointmentApi';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SD_Roles } from '../../app/utility/SD';
import withAuthorization from '../../app/hoc/withAuthorization';

function AppointmentUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError } = useGetAppointmentByIdQuery(id);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        return <AppointmentForm id={id} data={data} />;
    }

    return <div>No appointment data available.</div>;
}

export default withAuthorization(AppointmentUpdate, [SD_Roles.NURSE]);