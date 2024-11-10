/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import DoctorForm from './DoctorForm';
import { useGetDoctorByIdQuery } from '../../app/APIs/doctorApi';
import MainLoader from '../../app/common/MainLoader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';

function DoctorUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError } = useGetDoctorByIdQuery(id);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        console.log(data);
        return <DoctorForm id={id} data={data} />;
    }

    return <div>No doctor data available.</div>;
}

export default withAuthorization(DoctorUpdate, [SD_Roles.DOCTOR, SD_Roles.ADMINISTRATOR]);