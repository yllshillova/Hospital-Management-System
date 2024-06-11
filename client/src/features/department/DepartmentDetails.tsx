import { useNavigate, useParams } from "react-router-dom";
import { useGetDepartmentByIdQuery } from "../../app/APIs/departmentApi";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Header, SidePanel } from "../../app/layout";
import { TableCell, TableRow, OrdersTable, TableNav, TableHeader, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import StaffMember from "../../app/models/StaffMember";
import { BackButton } from "../../app/common/styledComponents/details";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import { connectionError } from "../../app/utility/connectionError";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function DepartmentDetails() {

    const { id } = useParams();
    const { data, isLoading, error } = useGetDepartmentByIdQuery(id);
    const navigate = useNavigate();

    let content;

    const staff: StaffMember[] = data?.staff || [];

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }

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
        const errorMessage = (fetchError?.data as string);

        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("department")}</ErrorDescription>
                    </ErrorTitleRow>
                    <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                </ErrorMessage>
            </>
        );
    }

    else {
        content = (
            <>
                <tbody>

                </tbody>
                <tbody>
                    {staff.map((staffMember: StaffMember) => (
                        <TableRow key={staffMember.id}>
                            <TableCell>{staffMember.name}</TableCell>
                            <TableCell>{staffMember.lastName}</TableCell>
                            <TableCell>{staffMember.email}</TableCell>
                            <TableCell>{staffMember.residence}</TableCell>

                        </TableRow>
                    ))}
                </tbody>
            </>
        );
        content = (
            <>
                <Header />
                <SidePanel />
                <OrdersTable>
                    <TableNav>
                        <TableHeader>Staff of {data?.name} </TableHeader>
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell>Name</TableHeaderCell>
                                <TableHeaderCell>Last Name</TableHeaderCell>
                                <TableHeaderCell>Email</TableHeaderCell>
                                <TableHeaderCell>Residence</TableHeaderCell>
                            </TableHead>
                        </thead>
                        {content}
                    </Table>
                    <BackButton
                        onClick={() => navigate("/departments")}>
                        Back to Departments
                    </BackButton>
                </OrdersTable>

            </>
        );
    }

    return content;
}
export default withAuthorization(DepartmentDetails, [SD_Roles.ADMINISTRATOR]);