/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteRoomMutation, useGetRoomsQuery } from "../../app/APIs/roomApi";
import MainLoader from "../../app/common/MainLoader";
import Room from "../../app/models/Room";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { useLocation, useNavigate } from "react-router-dom";
import toastNotify from "../../app/helpers/toastNotify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import Department from "../../app/models/Department";
import { useGetDepartmentsQuery } from "../../app/APIs/departmentApi";
import MiniLoader from "../../app/common/MiniLoader";
import { SD_Roles } from "../../app/utility/SD";
import withAuthorization from "../../app/hoc/withAuthorization";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";
import User from "../../app/models/User";
import { connectionError } from "../../app/utility/connectionError";


function RoomList() {

    const { data, isLoading, error } = useGetRoomsQuery(null);
    const { data: departments, isLoading: isDepartmentsLoading } = useGetDepartmentsQuery(null);


    const departmentMap = new Map<string, string>();
    departments?.forEach((department: Department) => {
        departmentMap.set(department.id, department.name);
    });

    const getDepartmentName = (departmentId: string) => {
        return departmentMap.get(departmentId) || "Department not found!";
    };
    const navigate = useNavigate();
    const location = useLocation();
    const [deleteRoom] = useDeleteRoomMutation();
    
    const userData: User = useSelector(
        (state: RootState) => state.auth
    );


    const handleRoomDelete = async (id: string,) => {
        const result = await deleteRoom(id);

        if ('data' in result) {
            toastNotify("Room has been deleted ", "success");
            navigate('/rooms');
        }
        else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }

    };
    let content;

    if (isLoading ) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    }
    else if (error) {
        const fetchError = error as FetchBaseQueryError;
        const errorMessage = fetchError?.data as string;
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("rooms")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/room/insert")}>Insert a room </BackButton>

                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    } 
    else {
        content = data.map((room: Room) => {
            return (
                <tbody key={room.id}>
                    <TableRow>
                        <TableCell>#{room.roomNumber}</TableCell>
                        <TableCell>{room.bedsAvailable}</TableCell>
                        <TableCell>{isDepartmentsLoading ? (
                            <MiniLoader />
                        ) : getDepartmentName(room.departmentId)} </TableCell>

                        {/*<TableCell>{new Date(room.createdAt).toLocaleDateString()}</TableCell>*/}
                        {/*<TableCell>{new Date(room.updatedAt).toLocaleDateString()}</TableCell>*/}
                        <TableCell></TableCell>

                        {userData.role == SD_Roles.NURSE &&
                            

                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/room/" + room.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                            </ActionButton>
                        }

                        {userData.role == SD_Roles.ADMINISTRATOR &&
                            <>
                                <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/room/update/" + room.id)} >
                                    <FontAwesomeIcon icon={faEdit} />
                                </ActionButton>

                                <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleRoomDelete(room.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </ActionButton>
                            </>
                        }
                    </TableRow>
                </tbody>
            );
        });

        content = (
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
                            <TableHead>
                                <TableHeaderCell>Number</TableHeaderCell>
                                <TableHeaderCell>Beds Available</TableHeaderCell>
                                <TableHeaderCell>Department</TableHeaderCell>
                            </TableHead>
                        </thead>
                        {content}
                    </Table>
                </OrdersTable>
            </>
        );
            
    }

    return content;

}
export default withAuthorization(RoomList, [SD_Roles.ADMINISTRATOR, SD_Roles.NURSE]);