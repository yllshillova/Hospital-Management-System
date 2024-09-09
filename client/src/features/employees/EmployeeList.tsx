import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useGetEmployeesQuery } from "../../app/APIs/employeeApi";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faAdd, faExclamationCircle, faInfo } from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import { SD_Roles } from "../../app/utility/SD";
import { RootState } from "../../app/storage/redux/store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import withAuthorization from "../../app/hoc/withAuthorization";
import Employee from "../../app/models/Employee";

function EmployeeList() {

    const { data, isLoading, error } = useGetEmployeesQuery(null);

    const userData = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

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
        const errorMessage = fetchError?.data as string;
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("employees")} </ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/department/insert")}>Insert an employee </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }

    else {
        content = data.map((employee: Employee) => {
            return (
                <tbody key={employee.id}>
                    <TableRow>
                        <TableCell>{employee.fullName}</TableCell>
                        <TableCell>{employee.isActive ? "Yes" : "No"}</TableCell>
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
                        <TableHeader>Employee List</TableHeader>
                        <AddButton onClick={() => navigate("/employee/insert")}  >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell>Full Name</TableHeaderCell>
                                <TableHeaderCell>Active </TableHeaderCell>
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
export default withAuthorization(EmployeeList, [SD_Roles.ADMINISTRATOR]);