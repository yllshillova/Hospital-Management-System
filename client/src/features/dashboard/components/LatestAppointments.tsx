import styled from "styled-components";
import { useGetLatestAppointmentsQuery } from "../../../app/APIs/appointmentApi";
import Appointment from "../../../app/models/Appointment";
import { useGetPatientsQuery } from "../../../app/APIs/patientApi";
import Patient from "../../../app/models/Patient";
import MiniLoader from "../../../app/common/MiniLoader";
function LatestAppointments() {

    const { data: latestAppointments , isLoading, error } = useGetLatestAppointmentsQuery(null); 
    const { data: patientsData , isLoading : patientsLoading, error: patientsError} = useGetPatientsQuery(null);

    let content;

    if (isLoading || patientsLoading) {
        content = <MiniLoader />;
    } else if (error || patientsError) {
        content = <div>Error loading the latest appointments</div>
    }
    else {
        content = latestAppointments?.map((appointment: Appointment, index: number) => {
            const patient = patientsData?.find((patient: Patient) => patient.id === appointment.patientId);
            return (
                <tbody>
                    <TableRow key={index}>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.lastName}</TableCell>
                        <TableCell>{new Date(appointment.checkInDate!).toLocaleString()}</TableCell>
                        <TableCell>{new Date(appointment.checkOutDate!).toLocaleString()}</TableCell>
                        <TableCell>{appointment.reason}</TableCell>
                        </TableRow>
                </tbody>

            );
        });

    }


    return (
        <Container flex={2}>
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
                    {content}
                </Table>
            </TableContainer>
        </Container>
    );
};

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
