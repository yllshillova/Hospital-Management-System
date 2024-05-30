import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetDepartmentByIdQuery } from "../../app/APIs/departmentApi";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { Header, SidePanel } from "../../app/layout";
import { TableCell, TableRow, OrdersTable, TableNav, TableHeader, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, Message, ErrorMessage } from "../../app/common/styledComponents/table";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import StaffMember from "../../app/models/StaffMember";
import { BackButton } from "../../app/common/styledComponents/details";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function DepartmentDetails() {

    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetDepartmentByIdQuery(id);
    console.log(data);
    const navigate = useNavigate();
    const location = useLocation();
    let content;

    const staff: StaffMember[] = data?.staff || [];

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) {
        content = <MainLoader />;
    } else if (error) {
        return (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <Message>
                            {(error?.data as FetchBaseQueryError)}
                        </Message>
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
    }

    return (
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
export default withAuthorization(DepartmentDetails, [SD_Roles.ADMINISTRATOR]);