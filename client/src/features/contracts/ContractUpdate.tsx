/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { SD_Roles } from '../../app/utility/SD';
import withAuthorization from '../../app/hoc/withAuthorization';
import { useGetContractByIdQuery } from '../../app/APIs/contractApi';
import ContractForm from './ContractForm';

function ContractUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError } = useGetContractByIdQuery(id);
    console.log(data);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        return <ContractForm id={id} data={data} />;
    }

    return <div>No contract data available.</div>;
}

export default withAuthorization(ContractUpdate, [SD_Roles.ADMINISTRATOR]);