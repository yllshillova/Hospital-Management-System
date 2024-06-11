import styled from "styled-components";
import Visit from "../../../app/models/Visit";
import Patient from "../../../app/models/Patient";
import { useGetPatientsQuery } from "../../../app/APIs/patientApi";
import Doctor from "../../../app/models/Doctor";
import { useGetLatestVisitsQuery } from "../../../app/APIs/visitApi";
import { useGetDoctorsQuery } from "../../../app/APIs/doctorApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorCard, ErrorDescription, ErrorIcon, ErrorMessage, ErrorTitleRow, Message } from "../../../app/common/styledComponents/table";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import MainLoader from "../../../app/common/MainLoader";
import { connectionError } from "../../../app/utility/connectionError";

function LatestVisits() {

    const { data: latestVisits, isLoading, error } = useGetLatestVisitsQuery(null);
    const { data: patientsData, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null);
    const { data: doctorsData, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(null);

    let content;

    if (isLoading || patientsLoading || doctorsLoading) {
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

    else if (error || patientsError || doctorsError) {
        const fetchError = (error as FetchBaseQueryError) ||
            (patientsError as FetchBaseQueryError) ||
            (doctorsError as FetchBaseQueryError);
        const errorMessage = fetchError?.data as string;

        content = (
            <ErrorCard>
                <ErrorTitleRow>
                    <ErrorIcon icon={faExclamationCircle} />
                    <ErrorDescription>{connectionError("latest visits") || errorMessage}</ErrorDescription>
                </ErrorTitleRow>
            </ErrorCard>
        );
    }

    else if (latestVisits.length === 0) {
        content = (
            <ErrorMessage>
                <ErrorTitleRow>
                    <ErrorIcon icon={faExclamationCircle} />
                    <Message>No visits found.</Message>
                </ErrorTitleRow>
            </ErrorMessage>
        );
    }

    else {
        content = latestVisits?.map((visit: Visit) => {
            const patient = patientsData?.find((patient: Patient) => patient.id === visit.patientId);
            const doctor = doctorsData?.find((doctor: Doctor) => doctor.id === visit.doctorId);

            return (
                <TableRow key={visit.id}>
                    <TableCell>{doctor?.name} {doctor?.lastName}</TableCell>
                    <TableCell>{patient?.name} {patient?.lastName}</TableCell>
                    <TableCell>{visit.complaints}</TableCell>
                    <TableCell>{visit.diagnosis}</TableCell>
                </TableRow>
            );
        });
        content = (
            <Container>
                <Title>Latest Visits</Title>
                <TableContainer>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeader>Doctor</TableHeader>
                                <TableHeader>Patient</TableHeader>
                                <TableHeader>Complaints</TableHeader>
                                <TableHeader>Diagnosis</TableHeader>
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

export default LatestVisits;



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
