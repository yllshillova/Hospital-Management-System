import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetRoomsQuery } from "../../app/APIs/roomApi";
import MainLoader from "../../app/common/MainLoader";
import Room from "../../app/models/Room";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { useNavigate } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
function RoomList() {
    const { data, isLoading, error } = useGetRoomsQuery(null);
    const navigate = useNavigate();
    let content;

    if (isLoading) {
        content = <MainLoader />;
    } else if (error) {
        content = <div>Error loading rooms.</div>;
    }
    else {
        content = data.map((room: Room) => {
            return (
                <tbody key={room.id}>
                    <TableRow>
                        <TableCell>{room.capacity}</TableCell>
                        <TableCell>{room.isFree}</TableCell>
                        <TableCell>{room.patientId}</TableCell>
                        <TableCell>{new Date(room.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(room.updatedAt).toLocaleDateString()}</TableCell>
                        <ActionButton style={{ backgroundColor: "green" }} onClick={() => navigate("/room/" + room.id)} >
                            <FontAwesomeIcon icon={faCircle} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/roomUpsert/" + room.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        {/*TODO: add handler for delete*/}
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
                    <TableHeader>Rooms List</TableHeader>
                    <AddButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/roomUpsert")}  >
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeaderCell>Capacity</TableHeaderCell>
                            <TableHeaderCell>IsFree</TableHeaderCell>
                            <TableHeaderCell>PatientId</TableHeaderCell>
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