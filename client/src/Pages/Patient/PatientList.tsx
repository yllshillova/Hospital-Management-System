import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Header, SidePanel } from "../../Components/Layout/Dashboard";
import { useNavigate } from "react-router-dom";

function PatientList() {

    const navigate = useNavigate();

    return (
        <>
            <Header />
            <SidePanel />
            
                <OrdersTable>
                    <TableNav>
                        <TableHeader>Patient List</TableHeader>
                        <AddButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/PatientUpsert")} >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>

                    <Table>
                        <thead>
                            <TableRow>
                                <TableHeaderCell>Title</TableHeaderCell>
                                <TableHeaderCell>Title</TableHeaderCell>
                                <TableHeaderCell>Title</TableHeaderCell>
                                <TableHeaderCell>Title</TableHeaderCell>
                                <TableHeaderCell>Title</TableHeaderCell>
                                <TableHeaderCell>Title</TableHeaderCell>
                                <TableHeaderCell>Title</TableHeaderCell>

                                <TableHeaderCell>Action</TableHeaderCell>
                            </TableRow>
                        </thead>

                                <tbody>
                                    <TableRow >
                                        <TableCell>Data</TableCell>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Data</TableCell>

                                        <ActionButton style={{ backgroundColor: "orange" }}  >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </ActionButton>
                                        <ActionButton style={{ backgroundColor: "red" }}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </ActionButton>
                                    </TableRow>
                                </tbody>
                    </Table>
                </OrdersTable>
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
