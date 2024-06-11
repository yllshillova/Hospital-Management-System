/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteDepartmentMutation, useGetDepartmentsQuery } from "../../app/APIs/departmentApi";
import MainLoader from "../../app/common/MainLoader";
import Department from "../../app/models/Department";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon,  BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { useLocation, useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toastNotify from "../../app/helpers/toastNotify";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { connectionError } from "../../app/utility/connectionError";
import { useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";

function DepartmentList() {

    const { data, isLoading, error } = useGetDepartmentsQuery(null);
    const [deleteDepartment] = useDeleteDepartmentMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector((state: RootState) => state.auth);

    let content;



    const handleDepartmentDelete = async (id: string) => {
        const result = await deleteDepartment(id);

        if ('data' in result) {
            toastNotify("Department has been deleted ", "success");
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
                        <ErrorDescription>{errorMessage ||  connectionError("departments")} </ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/department/insert")}>Insert a department </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {
        content = data.map((department: Department) => {
            return (
                <tbody key={department.id}>
                    <TableRow>
                        <TableCell>{department.name}</TableCell>
                        <TableCell>{new Date(department.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(department.updatedAt).toLocaleDateString()}</TableCell>

                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/department/" + department.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/department/update/" + department.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleDepartmentDelete(department.id) }>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </ActionButton>

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
                            <TableHeader>Departments List</TableHeader>
                            <AddButton onClick={() => navigate("/department/insert")}  >
                                <FontAwesomeIcon icon={faAdd} />
                            </AddButton>
                        </TableNav>
                        <Table>
                            <thead>
                                <TableHead>
                                    <TableHeaderCell>Name</TableHeaderCell>
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
    return content;
}

export default withAuthorization(DepartmentList, [SD_Roles.ADMINISTRATOR]);