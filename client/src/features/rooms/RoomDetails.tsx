/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { /*useLocation,useNavigate,*/ useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
//import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
//import { useGetRoomByIdQuery } from "../../app/APIs/roomApi";
//import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import { ActionButton, AddButton, OrdersTable, Table, TableCell, TableHeader, TableHeaderCell, TableNav, TableRow } from "../../app/common/styledComponents/table";
//import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Header, SidePanel } from "../../app/layout";
import Patient from "../../app/models/Patient";


//function isValidGuid(guid: string): boolean {
//    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
//    return guidRegex.test(guid);
//}

function RoomDetails() {
    const { id } = useParams();
    //const { data, isLoading ,isError ,error} = useGetRoomByIdQuery(id);
    const { data , isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(id); // Marrja e pacientëve për dhomën me ID të caktuar
    const navigate = useNavigate();
    //const location = useLocation();

    //if (!isValidGuid(id as string)) {
    //    navigate('/not-found');
    //    return;
    //}
    //const fbError = error as FetchBaseQueryError;

    //if (isError) {
    //    useErrorHandler(fbError, navigate, location.pathname);
    //}



    //if (isLoading) return <MainLoader />;

    //if (data) {
    //    const room = data;

    let content;

    if (patientsLoading) content = <MainLoader />; // Nëse të dhënat janë ende duke u ngarkuar, shfaq një ikonë ngarkimi

    else if (patientsError) {
        content =  <div>Error loading patients.</div>; // Nëse ka ndodhur një gabim gjatë ngarkimit të pacientëve, shfaq një mesazh gabimi
    } else {
        content = data.map((patient: Patient) => {
            return (
                <tbody key={patient.id}>
                    <TableRow>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.lastName}</TableCell>
                        <TableCell>{patient.parentName}</TableCell>
                        <TableCell>{patient.phoneNumber}</TableCell>
                        <TableCell>{patient.isDeleted} </TableCell>
                        <TableCell>{new Date(patient.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(patient.updatedAt).toLocaleDateString()}</TableCell>
                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/patient/" + patient.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/patient/update/" + patient.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "red" }} >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </ActionButton>
                    </TableRow>
                </tbody>
            );

            //    return (
            //        <>
            //            <div>
            //                <h2>Room Details</h2>
            //                <p>Id: {room.id}</p>
            //                <p>Capacity: {room.nrDhomes}</p>
            //                <p>Capacity: {room.capacity}</p>
            //                <p>Status: {room.isFree === false ? "Occupied" : "Free"}</p>
            //                <p>Created At: {new Date(room.createdAt).toLocaleDateString()}</p>
            //                <p>Updated At: {new Date(room.updatedAt).toLocaleDateString()}</p>
            //            </div>
            //        </>
            //    );
            //}
            //return null;

            //return (
            //    <div>
            //        <h2>Patient List for Room with id {id}</h2>
            //        <Table>
            //            <thead>
            //                <tr>
            //                    <TableHeaderCell>Name</TableHeaderCell>
            //                    <TableHeaderCell>Last Name</TableHeaderCell>
            //                    <TableHeaderCell>Parent Name</TableHeaderCell>

            //                </tr>
            //            </thead>
            //            <tbody>
            //                {data && data.length > 0 && data.map((patient: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; lastName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; parentName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
            //                    <TableRow key={patient.id}>
            //                        <TableCell>{patient.name}</TableCell>
            //                        <TableCell>{patient.lastName}</TableCell>
            //                        <TableCell>{patient.parentName}</TableCell>
            //                        {/* Shtoni më shumë kolona për të dhëna të tjera të pacientit sipas nevojës */}
            //                    </TableRow>
            //                ))}
            //            </tbody>
            //        </Table>
            //    </div>
            //);
        })
    }
    return (
        <>
            <Header />
            <SidePanel />
            <OrdersTable>
                <TableNav>
                    <TableHeader>Patients List in room </TableHeader>
                    <AddButton style={{ backgroundColor: "#1a252e" }} onClick={() => navigate("/addPatientToRoom")}>
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
                            <TableHeaderCell>Is Deleted</TableHeaderCell>
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

export default RoomDetails;
