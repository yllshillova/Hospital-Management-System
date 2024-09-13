import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faAdd, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import Group from "../../app/models/Group";
import { useGetGroupsQuery } from "../../app/APIs/groupApi";

function GroupList() {

    const { data, isLoading, error } = useGetGroupsQuery(null);

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
                        <ErrorDescription>{errorMessage || connectionError("Groups")} </ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage  ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/group/insert")}>Insert a Group </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }

    else {
        content = data.map((Group: Group) => {
            return (
                <tbody key={Group.id}>
                    <TableRow>
                        <TableCell>{Group.name}</TableCell>
                        <TableCell>{Group.description}</TableCell>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/group/update/" + Group.id)} >
                            <FontAwesomeIcon icon={faEdit} />
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
                        <TableHeader>Group List</TableHeader>
                        <AddButton onClick={() => navigate("/group/insert")}  >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell> Name</TableHeaderCell>
                                <TableHeaderCell>Description</TableHeaderCell>
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
export default GroupList;

