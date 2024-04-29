/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteRoomMutation, useGetRoomsQuery } from "../../app/APIs/roomApi";
import MainLoader from "../../app/common/MainLoader";
import Room from "../../app/models/Room";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { useLocation, useNavigate } from "react-router-dom";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
//import { useEffect, useState } from "react";
//import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import toastNotify from "../../app/helpers/toastNotify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
function RoomList() {
    const { data, isLoading, error } = useGetRoomsQuery(null);
    /*const { data: roomsData, isLoading: roomsLoading, error: roomsError } = useGetRoomsQuery(null);*/
   /* const { data: patientsData, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null); */
    const navigate = useNavigate();
    const location = useLocation();
    /*const [rooms, setRooms] = useState<Room[]>([]);*/
    const [deleteRoom] = useDeleteRoomMutation();


    //useEffect(() => {
    //    if (roomsData && patientsData) {
    //        const roomsWithPatients = roomsData.map((room: Room) => ({
    //            ...room,
    //            patientName: patientsData.find((patient: { id: number; }) => patient.id === room.patientId)?.name || 'Unknown', // Use patient's name or 'Unknown' if not found
    //        }));
    //        setRooms(roomsWithPatients);
    //    }
    //}, [roomsData, patientsData]);


    let content;


    //const handleRoomDelete = async (id: number) => {
    //    toast.promise(
    //        deleteRoom(id),
    //        {
    //            pending: "Processing your request...",
    //            success: "Room Deleted Successfully ??",
    //            error: "Error displaying",
    //        }
    //    );
    //};

    const handleRoomDelete = async (id: number,) => {
        const result = await deleteRoom(id);

        if ('data' in result) {
            toastNotify("Room Deleted Successfully", "success");
        }
        else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }

    };
 

    if (isLoading /*|| patientsLoading*/) {
        content = <MainLoader />;
    } else if (error/*roomsError || patientsError*/) {
        content = <div>Error loading data.</div>;
    } 
    else {
        content = data.map((room: Room) => {
            return (
                <tbody key={room.id}>
                    <TableRow>
                        <TableCell>{room.nrDhomes}</TableCell>
                        <TableCell>{room.capacity}</TableCell>
                        <TableCell>{room.isFree === false ? "Occupied" : "Free"}</TableCell>
                       
                        <TableCell>{new Date(room.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(room.updatedAt).toLocaleDateString()}</TableCell>
                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/room/" + room.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/room/update/" + room.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        {/*TODO: add handler for delete*/}
                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleRoomDelete(room.id)}>
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
                    <TableHeader>Rooms List</TableHeader>
                    <AddButton style={{ backgroundColor: "#1a252e" }} onClick={() => navigate("/room/insert")}  >
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeaderCell>NrDhomes</TableHeaderCell>
                            <TableHeaderCell>Capacity</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                          
                            <TableHeaderCell>CreatedAt</TableHeaderCell>
                            <TableHeaderCell>UpdatedAt</TableHeaderCell>
                        </TableRow>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default RoomList;