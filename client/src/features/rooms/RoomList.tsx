import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteRoomMutation, useGetRoomsQuery } from "../../app/APIs/roomApi";
import MainLoader from "../../app/common/MainLoader";
import Room from "../../app/models/Room";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { useNavigate } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import { toast } from "react-toastify";
function RoomList() {
    //const { data, isLoading, error } = useGetRoomsQuery(null);
    const { data: roomsData, isLoading: roomsLoading, error: roomsError } = useGetRoomsQuery(null);
    const { data: patientsData, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null); 
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [deleteRoom] = useDeleteRoomMutation();


    useEffect(() => {
        if (roomsData && patientsData) {
            const roomsWithPatients = roomsData.map((room: Room) => ({
                ...room,
                patientName: patientsData.find((patient: { id: number; }) => patient.id === room.patientId)?.name || 'Unknown', // Use patient's name or 'Unknown' if not found
            }));
            setRooms(roomsWithPatients);
        }
    }, [roomsData, patientsData]);


    let content;


    const handleRoomDelete = async (id: number) => {
        toast.promise(
            deleteRoom(id),
            {
                pending: "Processing your request...",
                success: "Room Deleted Successfully ??",
                error: "Error displaying",
            }
        );
    };
 

    if (roomsLoading || patientsLoading) {
        content = <MainLoader />;
    } else if (roomsError || patientsError) {
        content = <div>Error loading data.</div>;
    } 
    else {
        content = rooms.map((room: Room) => {
            return (
                <tbody key={room.id}>
                    <TableRow>
                        <TableCell>{room.capacity}</TableCell>
                        <TableCell>{room.isFree === false ? "Occupied" : "Free"}</TableCell>
                       
                        <TableCell>{new Date(room.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(room.updatedAt).toLocaleDateString()}</TableCell>
                        <ActionButton style={{ backgroundColor: "green" }} onClick={() => navigate("/room/" + room.id)} >
                            <FontAwesomeIcon icon={faCircle} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/roomUpsert/" + room.id)} >
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
                    <AddButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/roomUpsert")}  >
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableRow>
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