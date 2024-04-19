import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import MainLoader from "../../app/common/MainLoader";
import Patient from "../../app/models/Patient";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { useNavigate } from "react-router-dom";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
function PatientList() {
    const { data, isLoading, error } = useGetPatientsQuery(null);
    const navigate = useNavigate();
    let content;

    if (isLoading) {
        content = <MainLoader />;
    } else if (error) {
        content = <div> Error loading patients.</div>;
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
                        <TableCell>{new Date(patient.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(patient.updatedAt).toLocaleDateString()}</TableCell>
                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/patient/" + patient.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }}>
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "red" }}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </ActionButton>
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
                    <AddButton style={{ backgroundColor: "#1a252e" }}>
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Last Name</TableHeaderCell>
                            <TableHeaderCell>Parent Name</TableHeaderCell>
                            <TableHeaderCell>Phone Number</TableHeaderCell>
                            <TableHeaderCell>Created At</TableHeaderCell>
                            <TableHeaderCell>Updated At</TableHeaderCell>
                        </TableRow>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default PatientList;