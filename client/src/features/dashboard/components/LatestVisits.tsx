import styled from "styled-components";
import Visit from "../../../app/models/Visit";
import Patient from "../../../app/models/Patient";
import { useGetPatientsQuery } from "../../../app/APIs/patientApi";
import Doctor from "../../../app/models/Doctor";
import { useGetLatestVisitsQuery } from "../../../app/APIs/visitApi";
import { useGetDoctorsQuery } from "../../../app/APIs/doctorApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { BackButton, ErrorIcon, ErrorMessage, ErrorTitleRow, Message } from "../../../app/common/styledComponents/table";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import MainLoader from "../../../app/common/MainLoader";

function LatestVisits() {

    const { data: latestVisits, isLoading, error } = useGetLatestVisitsQuery(null);
    const { data: patientsData, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null);
    const { data: doctorData, isLoading: doctorsLoading, error: docError } = useGetDoctorsQuery(null);

    const navigate = useNavigate();
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
    else if (error || patientsError || docError) {
        const errorMessage = ((error as FetchBaseQueryError)?.data ||
            (patientsError as FetchBaseQueryError)?.data ||
            (docError as FetchBaseQueryError)?.data) as string;

        content = (
            <ErrorMessage>
                <ErrorTitleRow>
                    <ErrorIcon icon={faExclamationCircle} />
                    <Message>{errorMessage}</Message>
                </ErrorTitleRow>
                <BackButton onClick={() => navigate(-1)}>Back</BackButton>
            </ErrorMessage>
        );
    } else {
        content = latestVisits?.map((visit: Visit) => {
            const patient = patientsData?.find((patient: Patient) => patient.id === visit.patientId);
            const doctor = doctorData?.find((doctor: Doctor) => doctor.id === visit.doctorId);

            return (
                <TableRow key={visit.id}>
                    <TableCell>{doctor?.name} {doctor?.lastName}</TableCell>
                    <TableCell>{patient?.name} {patient?.lastName}</TableCell>
                    <TableCell>{visit.complaints}</TableCell>
                    <TableCell>{visit.diagnosis}</TableCell>
                </TableRow>
            );
        });
    }

    return (
        <Container>
            <Title>Latest Visits</Title>
            <TableContainer>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>Doctor</TableHeader>
                            <TableHeader>Patient</TableHeader>
                            <TableHeader>Complaints</TableHeader>
                            <TableHeader>Diagnosis</TableHeader>
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

export default LatestVisits;

const Container = styled.div`
  border: 1px  #ddd;
  border-radius: 15px;
  padding: 15px;
  background-color: white;
  margin: 35px 62px;
  
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

