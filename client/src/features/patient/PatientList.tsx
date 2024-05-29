﻿/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeletePatientMutation, useGetPatientsQuery } from "../../app/APIs/patientApi";
import MainLoader from "../../app/common/MainLoader";
import Patient from "../../app/models/Patient";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, Message, BackButton, ErrorMessage } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toastNotify from "../../app/helpers/toastNotify";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import { useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";

function PatientList() {
    const { data, isLoading, error } = useGetPatientsQuery(null);
    const [deletePatient] = useDeletePatientMutation();
    const location = useLocation();
    const navigate = useNavigate();

    const userData = useSelector((state: RootState) => state.auth);

    let content;

    const handlePatientDelete = async (id: string,) => {
        const result = await deletePatient(id);

        if ('data' in result) {
            toastNotify("Patient Deleted Successfully", "success");
        }
        else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }
    };
    if (isLoading) {
        content = <MainLoader />;
    } else if (error) {
        return (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <Message>
                            {(error?.data as FetchBaseQueryError)}
                        </Message>
                    </ErrorTitleRow>
                    <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                </ErrorMessage>
            </>
        );
    }
    else {
        content = data.map((patient: Patient) => {
            return (
                <tbody key={patient.id}>
                    <TableRow>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.lastName}</TableCell>
                        <TableCell>{patient.parentName}</TableCell>
                        <TableCell>{patient.phoneNumber}</TableCell>
                        <TableCell>{patient.isDeleted} </TableCell>
                        <TableCell>{new Date(patient.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(patient.updatedAt).toLocaleDateString()}</TableCell>

                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/patient/" + patient.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>

                        {userData.role == SD_Roles.NURSE &&
                            <>
                                <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/patient/update/" + patient.id)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </ActionButton>
                                <ActionButton style={{ backgroundColor: "red" }} onClick={() => handlePatientDelete(patient.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </ActionButton>
                            </>
                        }
                    </TableRow>
                </tbody>
            );
        });
    }

    return (
        <>
            <Header />
            <SidePanel />
            <OrdersTable>
                <TableNav>
                    <TableHeader>Patients List</TableHeader>

                    {userData.role == SD_Roles.NURSE &&

                    <AddButton onClick={() => navigate("/patient/insert")}>
                        <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    }
                </TableNav>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Last Name</TableHeaderCell>
                            <TableHeaderCell>Parent Name</TableHeaderCell>
                            <TableHeaderCell>Phone Number</TableHeaderCell>
                            <TableHeaderCell>Is Deleted</TableHeaderCell>
                            <TableHeaderCell>Date Created </TableHeaderCell>
                            <TableHeaderCell>Date Updated </TableHeaderCell>
                        </TableHead>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}
export default withAuthorization(PatientList, [SD_Roles.NURSE, SD_Roles.ADMINISTRATOR]);