import styled from "styled-components";
import { useGetLatestAppointmentsQuery } from "../../../app/APIs/appointmentApi";
import Appointment from "../../../app/models/Appointment";
import { useGetPatientsQuery } from "../../../app/APIs/patientApi";
import Patient from "../../../app/models/Patient";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {  ErrorCard, ErrorDescription, ErrorIcon, ErrorTitleRow } from "../../../app/common/styledComponents/table";
import MainLoader from "../../../app/common/MainLoader";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../../app/utility/connectionError";

function LatestAppointments() {

    const { data: latestAppointments , isLoading, error } = useGetLatestAppointmentsQuery(null); 
    const { data: patientsData , isLoading : patientsLoading, error: patientsError} = useGetPatientsQuery(null);

    let content;

    if (isLoading || patientsLoading) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    }

    else if (error || patientsError) {
        const fetchError = (error as FetchBaseQueryError) ||
            (patientsError as FetchBaseQueryError);
        const errorMessage = fetchError?.data as string;

        content = (
            <ErrorCard>
                <ErrorTitleRow>
                    <ErrorIcon icon={faExclamationCircle} />
                    <ErrorDescription>{connectionError("latest appointments") || errorMessage}</ErrorDescription>
                </ErrorTitleRow>
            </ErrorCard>
        );
    } 
    else if (latestAppointments.length === 0) {
            content = (
                <ErrorCard>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>No appointments found.</ErrorDescription>
                    </ErrorTitleRow>
                </ErrorCard>
            );
        }

    else {
        content = latestAppointments?.map((appointment: Appointment) => {
            const patient = patientsData?.find((patient: Patient) => patient.id === appointment.patientId);

            return (
                <TableRow key={appointment.id}>
                    <TableCell>{patient?.name}</TableCell>
                    <TableCell>{patient?.lastName}</TableCell>
                    <TableCell>{new Date(appointment.checkInDate!).toLocaleString()}</TableCell>
                    <TableCell>{new Date(appointment.checkOutDate!).toLocaleString()}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                </TableRow>
            );
        });
        content = (

            <Container>
                <Title>Latest Appointments</Title>
                <TableContainer>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Last Name</TableHeader>
                                <TableHeader>Check In</TableHeader>
                                <TableHeader>Check Out</TableHeader>
                                <TableHeader>Reason</TableHeader>
                            </TableHead>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }

    return content;

}

export default LatestAppointments;


const Container = styled.div`
  border: 1px  #ddd;
  border-radius: 15px;
  padding: 15px;
  background-color: white;
  margin-left:  5px; 
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 9px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.tr`
  border-bottom: 1px solid #d3d3d3;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
`;
