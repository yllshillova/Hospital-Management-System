import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import DepartmentForm from './DepartmentForm';
import { useGetDepartmentByIdQuery } from '../../app/APIs/departmentApi';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';

function DepartmentUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError } = useGetDepartmentByIdQuery(id);
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
        return <DepartmentForm id={id} data={data} />;
    }

    return <div>No department data available.</div>;
}

export default withAuthorization(DepartmentUpdate, [SD_Roles.ADMINISTRATOR]);
