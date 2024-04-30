import { useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import {  AddButton, OrdersTable, Table, TableCell, TableHeader, TableHeaderCell, TableNav, TableRow } from "../../app/common/styledComponents/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Header, SidePanel } from "../../app/layout";
import { useGetRoomPatientsQuery } from "../../app/APIs/roomApi";
//import Patient from "../../app/models/Patient";
//import RoomPatient from "../../app/models/RoomPatient";
//import toastNotify from "../../app/helpers/toastNotify";
//import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
//import useErrorHandler from "../../app/helpers/useErrorHandler";
export interface patientName{
    firstName: string;
    lastName: string;

}
function RoomDetails() {
    const { id } = useParams();
    const { data, isLoading: patientsLoading, error: patientsError } = useGetRoomPatientsQuery(id); // Merr lista e pacient�ve p�r dhom�n me ID t� caktuar
    const navigate = useNavigate();
    console.log(data)
    let content;

    if (patientsLoading) {
        content = <MainLoader />; // N�se t� dh�nat jan� ende duke u ngarkuar, shfaq nj� ikon� ngarkimi
    } else if (patientsError) {
        content = <div>Error loading patients.</div>; // N�se ka ndodhur nj� gabim gjat� ngarkimit t� pacient�ve, shfaq nj� mesazh gabimi
    } else {
        data.map((roomPatient: patientName) => (
            console.log(roomPatient)
        ))
        // Filtroni pacient�t p�r t� marr� vet�m ato q� jan� n� dhom�n me ID e caktuar
       // const roomPatients = data.filter((roomPatient: RoomPatient) => roomPatient.roomId === id);
        //   content = roomPatients.map((roomPatient: RoomPatient) => (
       content = data.map((roomPatient: patientName ) => (
            <tbody key={0}>
                <TableRow>
                    <TableCell>{roomPatient.firstName}</TableCell>
                    <TableCell>{roomPatient.lastName}</TableCell>
                    {/*<TableCell>{roomPatient.patient.parentName}</TableCell>*/}
                    {/*<TableCell>{roomPatient.patient.phoneNumber}</TableCell>*/}
                    {/*<TableCell>{roomPatient.patient.isDeleted}</TableCell>*/}
                    {/*<TableCell>{new Date(roomPatient.patient.createdAt).toLocaleDateString()}</TableCell>*/}
                    {/*<TableCell>{new Date(roomPatient.patient.updatedAt).toLocaleDateString()}</TableCell>*/}
                    {/*<ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/patient/" + roomPatient.patientId)}>*/}
                    {/*    <FontAwesomeIcon icon={faInfo} />*/}
                    {/*</ActionButton>*/}
                    {/*<ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/patient/update/" + roomPatient.patientId)}>*/}
                    {/*    <FontAwesomeIcon icon={faEdit} />*/}
                    {/*</ActionButton>*/}
                    {/*<ActionButton style={{ backgroundColor: "red" }} >*/}{/*onClick={() => handleDeletePatient(roomPatient.patientId)}*/}
                    {/*    <FontAwesomeIcon icon={faTrashAlt} />*/}
                    {/*</ActionButton>*/}
                </TableRow>
            </tbody>
));
    }

    return (
        <>
            <Header />
            <SidePanel />
            <OrdersTable>
                <TableNav>
                    <TableHeader>Patients List in room </TableHeader>
                    <AddButton style={{ backgroundColor: "#1a252e" }} onClick={() => navigate( `/addPatientToRoom?${id}`)}>
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Last Name</TableHeaderCell>
                            {/*<TableHeaderCell>Parent Name</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Phone Number</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Is Deleted</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Created At</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Updated At</TableHeaderCell>*/}
                        </TableRow>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default RoomDetails;
