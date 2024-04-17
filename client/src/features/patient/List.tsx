import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import MainLoader from "../../app/common/MainLoader";
import Patient from "../../app/models/Patient";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell } from "../../app/common/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { useNavigate } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
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
                        {/*<TableCell>{patient.personalNumber}</TableCell>*/}
                        {/*<TableCell>{patient.address}</TableCell>*/}
                        {/*<TableCell>{patient.residence}</TableCell>*/}
                        {/*<TableCell>{patient.birthday}</TableCell>*/}
                        {/*<TableCell>{patient.bloodgroup}</TableCell>*/}
                        {/*<TableCell>{patient.gender}</TableCell>*/}
                        {/*<TableCell>{patient.email}</TableCell>*/}
                        {/*<TableCell>{patient.phonenumber}</TableCell>*/}
                        <TableCell>{new Date(patient.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(patient.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell>{patient.isDeleted ? "Active" : "Passive"}</TableCell>
                        {/*<TableCell>{patient.occupation}</TableCell>*/}
                        {/*<TableCell>{patient.allergies}</TableCell>*/}
                        <ActionButton style={{ backgroundColor: "green" }} onClick={() => navigate("/patient/" + patient.id)} >
                            <FontAwesomeIcon icon={faCircle} />
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
                    <AddButton style={{ backgroundColor: "teal" }}>
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>LastName</TableHeaderCell>
                            <TableHeaderCell>ParentName</TableHeaderCell>
                            {/*<TableHeaderCell>PersonalNumber</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Address</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Residence</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Birthday</TableHeaderCell>*/}
                            {/*<TableHeaderCell>BloodGroup</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Gender</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Email</TableHeaderCell>*/}
                            <TableHeaderCell>PhoneNumber</TableHeaderCell>
                            <TableHeaderCell>CreatedAt</TableHeaderCell>
                            {/*<TableHeaderCell>Occupation</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Allergies</TableHeaderCell>*/}
                        </TableRow>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default PatientList;