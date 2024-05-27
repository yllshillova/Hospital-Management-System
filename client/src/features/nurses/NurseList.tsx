/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead } from "../../app/common/styledComponents/table";
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

function NurseList() {
    const { data, isLoading, error } = useGetNursesQuery(null);
    const { data: departments, isLoading: isDepartmentsLoading } = useGetDepartmentsQuery(null);

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
    let content;



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



    if (isLoading) {
        content = <MainLoader />;
    } else if (error) {
        content = <div>{(error.data as FetchBaseQueryError)}</div>;
    }
    else {
        content = data.map((nurse: Nurse) => {
            return (
                <tbody key={nurse.id}>
                    <TableRow>
                        <TableCell>{nurse.name}</TableCell>
                        <TableCell>{nurse.lastName} </TableCell>
                        <TableCell>{isDepartmentsLoading ? (
                            <MiniLoader />
                        ) : getDepartmentName(nurse.departmentId)} </TableCell>
                        <TableCell>{nurse.isDeleted} </TableCell>
                        <TableCell>{new Date(nurse.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(nurse.updatedAt).toLocaleDateString()}</TableCell>
                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/nurse/" + nurse.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/nurse/update/" + nurse.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleNurseDelete(nurse.id)}>
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
                    <TableHeader>Nurses List</TableHeader>
                    <AddButton style={{ backgroundColor: "#1a252e" }} onClick={() => navigate("/nurse/insert")}  >
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Last Name</TableHeaderCell>
                            <TableHeaderCell>Department</TableHeaderCell>
                            <TableHeaderCell>Is Deleted</TableHeaderCell>
                            <TableHeaderCell>Date Created </TableHeaderCell>
                            <TableHeaderCell>Date Updated </TableHeaderCell>
                        </TableHead>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default withAuthorization(NurseList, [SD_Roles.NURSE, SD_Roles.ADMINISTRATOR]);