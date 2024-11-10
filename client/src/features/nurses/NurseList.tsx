/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toastNotify from "../../app/helpers/toastNotify";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useDeleteNurseMutation, useGetNursesQuery } from "../../app/APIs/nurseApi";
import Nurse from "../../app/models/Nurse";
import { useGetDepartmentsQuery } from "../../app/APIs/departmentApi";
import MiniLoader from "../../app/common/MiniLoader";
import Department from "../../app/models/Department";
import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from "../../app/utility/SD";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../app/storage/redux/store";
import { useSelector } from "react-redux";
import User from "../../app/models/User";
import { connectionError } from "../../app/utility/connectionError";

function NurseList() {
    const { data, isLoading, error } = useGetNursesQuery(null);
    const { data: departments, isLoading: isDepartmentsLoading } = useGetDepartmentsQuery(null);

    const userData: User = useSelector(
        (state: RootState) => state.auth
    );

    const departmentMap = new Map<string, string>();
    departments?.forEach((department: Department) => {
        departmentMap.set(department.id, department.name);
    });

    const getDepartmentName = (departmentId: string) => {
        return departmentMap.get(departmentId) || "Department not found!";
    };

    const [deleteNurse] = useDeleteNurseMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const handleNurseDelete = async (id: string,) => {
        const result = await deleteNurse(id);

        if ('data' in result) {
            toastNotify("Nurse Deleted Successfully", "success");
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

    if (isLoading) {

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
        const errorMessage = fetchError?.data as string ;
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("nurses")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/nurse/insert")}>Insert a nurse </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {

        content = data.map((nurse: Nurse) => {
            return (
                <tbody key={nurse.id}>
                    <TableRow>
                        <TableCell>{nurse.name}</TableCell>
                        <TableCell>{nurse.lastName} </TableCell>
                        <TableCell>{nurse.email} </TableCell>

                        <TableCell>{isDepartmentsLoading ? (
                            <MiniLoader />
                        ) : getDepartmentName(nurse.departmentId)} </TableCell>
                        <TableCell>{nurse.residence} </TableCell>
                        {/*<TableCell>{nurse.isDeleted} </TableCell>*/}
                        {/*<TableCell>{new Date(nurse.createdAt).toLocaleDateString()}</TableCell>*/}
                        {/*<TableCell>{new Date(nurse.updatedAt).toLocaleDateString()}</TableCell>*/}

                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/nurse/" + nurse.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        {userData.role == SD_Roles.ADMINISTRATOR && 
                                <>
                                <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/nurse/update/" + nurse.id)} >
                                    <FontAwesomeIcon icon={faEdit} />
                                </ActionButton>
                                <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleNurseDelete(nurse.id)}>
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
                        <TableHeader>Nurses List</TableHeader>
                        {userData.role == SD_Roles.ADMINISTRATOR &&
                            <>
                                <AddButton style={{ backgroundColor: "#1a252e" }} onClick={() => navigate("/nurse/insert")}  >
                                    <FontAwesomeIcon icon={faAdd} />
                                </AddButton>
                            </>
                        }
                        </TableNav>
                        <Table>
                            <thead>
                                <TableHead>
                                    <TableHeaderCell>Name</TableHeaderCell>
                                    <TableHeaderCell>Last Name</TableHeaderCell>
                                    <TableHeaderCell>Email</TableHeaderCell>
                                    <TableHeaderCell>Department</TableHeaderCell>
                                    <TableHeaderCell>Residence </TableHeaderCell>
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
export default withAuthorization(NurseList, [SD_Roles.NURSE, SD_Roles.ADMINISTRATOR]);