import styled from "styled-components";
import MiniLoader from "../../../app/common/MiniLoader";
import Visit from "../../../app/models/Visit";
import Patient from "../../../app/models/Patient";
import { useGetPatientsQuery } from "../../../app/APIs/patientApi";
import Doctor from "../../../app/models/Doctor";
import { useGetLatestVisitsQuery } from "../../../app/APIs/visitApi";
import { useGetDoctorsQuery } from "../../../app/APIs/doctorApi";

function LatestVisits() {

    const { data: latestVisits, isLoading, error } = useGetLatestVisitsQuery(null);
    const { data: patientsData, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null);
    const { data: doctorData, isLoading: doctorsLoading, error: docError } = useGetDoctorsQuery(null);

    let content;

    if (isLoading || patientsLoading || doctorsLoading) {
        content = <MiniLoader />;
    } else if (error || patientsError || docError) {
        content = <div>Error loading the latest visits</div>
    }
    else {
        content = latestVisits?.map((visit: Visit, index: number) => {
            const patient = patientsData?.find((patient: Patient) => patient.id === visit.patientId);
            const doctor = doctorData?.find((doctor: Doctor) => doctor.id === visit.doctorId);

            return (
                <tbody>
                    <TableRow key={index}>
                        <TableCell>{" "}</TableCell>
                        <TableCell>{doctor.name} {" "} {doctor.lastName}</TableCell>
                        <TableCell>{patient.name} {" "} {patient.lastName}</TableCell>
                        <TableCell>{visit.complaints}</TableCell>
                    </TableRow>
                </tbody>

            );
        });

    }

    return (
        <Container >
            <Title>Latest Visits</Title>
            <TableContainer>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>{""}</TableHeader>
                            <TableHeader>Doctor</TableHeader>
                            <TableHeader>Patient</TableHeader>
                            <TableHeader>Complaints</TableHeader>
                        </TableRow>
                    </thead>
                    {content}
                </Table>
            </TableContainer>
        </Container>
    );
};

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

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5; 
  }
  border-bottom: 1px solid #F5F5F5;

`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #F5F5F5;
`;

const TableCell = styled.td`
  padding: 10px;
`;
//const ProductImage = styled.img`
//  width: 50px; 
//  height: 50px; 
//  border-radius: 50%; 
//  border : 1px solid silver;
//  margin-right: 10px; 
//  object-fit:contain;
//`;
