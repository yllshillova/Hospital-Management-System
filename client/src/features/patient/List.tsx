import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Header, SidePanel } from "../../app/layout";
import { useNavigate } from "react-router-dom";
import Patient from "../../app/models/Patient";
import { toast } from "react-toastify";
import { useDeletePatientMutation, useGetPatientsQuery } from "../../app/APIs/patientApi";

function PatientList() {

    const [deletePatient] = useDeletePatientMutation();
    const { isLoading, data } = useGetPatientsQuery(null);
    const navigate = useNavigate();

    //delete a patient method
    const handlePatientDelete = async (id: number) => {
        toast.promise(deletePatient(id),
            {
                pending: "Processing your request...",
                success: "Patient Deleted Successfully 👌",
                error: "Error encountered 🤯",
            },
            {
                theme: "dark",
            }
        );
    };
    return (
        <>
            {isLoading && <MainLoader />}
            <Header />
            <SidePanel />
            {!isLoading && (
                <OrdersTable>
                    <TableNav>
                        <TableHeader>Patient List</TableHeader>
                        <AddButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/patientUpsert")} >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>

                    <Table>
                        <thead>
                            <TableRow>
                                <TableHeaderCell>Id</TableHeaderCell>
                                <TableHeaderCell>Name</TableHeaderCell>
                                <TableHeaderCell>LastName</TableHeaderCell>
                                <TableHeaderCell>ParentName</TableHeaderCell>
                                <TableHeaderCell>PersonalNumber</TableHeaderCell>
                                <TableHeaderCell>Address</TableHeaderCell>
                                <TableHeaderCell>Residence</TableHeaderCell>
                                <TableHeaderCell>Birthday</TableHeaderCell>
                                <TableHeaderCell>BloodGroup</TableHeaderCell>
                                <TableHeaderCell>Gender</TableHeaderCell>
                                <TableHeaderCell>Email</TableHeaderCell>
                                <TableHeaderCell>PhoneNumber</TableHeaderCell>
                                <TableHeaderCell>CreatedAt</TableHeaderCell>
                                <TableHeaderCell>UpdatedAt</TableHeaderCell>
                                <TableHeaderCell>IsDeleted</TableHeaderCell>
                                <TableHeaderCell>Occupation</TableHeaderCell>
                                <TableHeaderCell>Allergies</TableHeaderCell>

                                <TableHeaderCell>Action</TableHeaderCell>
                            </TableRow>
                        </thead>
                        {data.result.map((patient: Patient) => {
                            return (
                                <tbody key={patient.id}>
                                    <TableRow >
                                        <TableCell>{patient.id}</TableCell>
                                        <TableCell>{patient.name}</TableCell>
                                        <TableCell>{patient.lastName}</TableCell>
                                        <TableCell>{patient.parentName}</TableCell>
                                        <TableCell>{patient.personalNumber}</TableCell>
                                        <TableCell>{patient.address}</TableCell>
                                        <TableCell>{patient.residence}</TableCell>
                                        <TableCell>{patient.birthday}</TableCell>
                                        <TableCell>{patient.bloodgroup}</TableCell>
                                        <TableCell>{patient.gender}</TableCell>
                                        <TableCell>{patient.email}</TableCell>
                                        <TableCell>{patient.phonenumber}</TableCell>
                                        <TableCell>{new Date(patient.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(patient.updatedAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{patient.isDeleted}</TableCell>
                                        <TableCell>{patient.occupation}</TableCell>
                                        <TableCell>{patient.allergies}</TableCell>

                                        <ActionButton style={{ backgroundColor: "orange" }}  >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </ActionButton>
                                        <ActionButton style={{ backgroundColor: "red" }}
                                            onClick={() => handlePatientDelete(patient.id)}                                >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </ActionButton>
                                    </TableRow>
                                </tbody>

                            );
                        })}
                    </Table>
                </OrdersTable>
            )}
        </>
        );
}

const OrdersTable = styled.div`
  padding: 20px;
  margin-left: 200px; /*  based on the width of SidePanelContainer */
  background-color: #f5f5f5;
  margin-top:50px;

  `;

const TableHeader = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 0px 8px;
  margin-top:15px;
  `;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius:15px;
  background-color:white;
`;

const TableRow = styled.tr`
  border-bottom: 1.0px solid #d3d3d3;
`;

const TableHeaderCell = styled.th`
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  white-space: wrap;  /*  line to prevent text wrapping */

`;

const ActionButton = styled.button`
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 70px 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ease 0.3s;

  &:hover {
    background-color: teal;
    color: white;
    transform: scale(1.1);
  }
`;
const AddButton = styled.button`
  background: teal;
  color: white;
  border: none;
  padding: 8px 16px;
  margin:5px;
  border-radius: 5px;
  cursor: pointer;
  transition: ease 0.3s;

  &:hover {
    background-color: teal;
    color: white;
    transform: scale(1.1);
  }
`;

const TableNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:10px;
`;

export default PatientList;
