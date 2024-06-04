import styled from "styled-components";
import { useGetLatestAppointmentsQuery } from "../../../app/APIs/appointmentApi";
import Appointment from "../../../app/models/Appointment";
import { useGetPatientsQuery } from "../../../app/APIs/patientApi";
import Patient from "../../../app/models/Patient";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { BackButton, ErrorIcon, ErrorMessage, ErrorTitleRow, Message } from "../../../app/common/styledComponents/table";
import MainLoader from "../../../app/common/MainLoader";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function LatestAppointments() {

    const { data: latestAppointments , isLoading, error } = useGetLatestAppointmentsQuery(null); 
    const { data: patientsData , isLoading : patientsLoading, error: patientsError} = useGetPatientsQuery(null);

    const navigate = useNavigate();
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
        const errorMessage = ((error as FetchBaseQueryError)?.data ||
            (patientsError as FetchBaseQueryError)?.data) as string;

        content = (
            <ErrorMessage>
                <ErrorTitleRow>
                    <ErrorIcon icon={faExclamationCircle} />
                    <Message>{errorMessage}</Message>
                </ErrorTitleRow>
                <BackButton onClick={() => navigate(-1)}>Back</BackButton>
            </ErrorMessage>
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
    }

    return (
        <Container flex={2}>
            <Title>Latest Appointments</Title>
            <TableContainer>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Last Name</TableHeader>
                            <TableHeader>Check In</TableHeader>
                            <TableHeader>Check Out</TableHeader>
                            <TableHeader>Reason</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default LatestAppointments;

const Container = styled.div<{ flex: number }>`
  border: 1px  #ddd;
  border-radius: 15px;
  padding: 15px;
  background-color: white;
  margin-left:  5px; 
  flex: ${({ flex }) => flex};
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
  border-bottom: 1px solid #d3d3d3;
  &:nth-last-child(2) {
    border-bottom: none;
  }
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
