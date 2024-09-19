import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faAdd, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import Sculptor from "../../app/models/Sculptor";
import { useGetSculptorsQuery } from "../../app/APIs/sculptorApi";

function SculptorList() {

    const { data, isLoading, error } = useGetSculptorsQuery(null);

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
                        <ErrorDescription>{errorMessage || connectionError("sculptors")} </ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage  ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/sculptor/insert")}>Insert a Sculptor </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }

    else {
        content = data.map((sculptor: Sculptor) => {
            return (
                <tbody key={sculptor.id}>
                    <TableRow>
                        <TableCell>{sculptor.name}</TableCell>
                        <TableCell>{sculptor.birthYear}</TableCell>
                        <TableCell>{sculptor.isDeleted ? "Yes" : "No"}</TableCell>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/sculptor/update/" + sculptor.id)} >
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
                        <TableHeader>Sculptor List</TableHeader>
                        <AddButton onClick={() => navigate("/sculptor/insert")}  >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell> Name</TableHeaderCell>
                                <TableHeaderCell> Birth Year</TableHeaderCell>
                                <TableHeaderCell>Is Deleted </TableHeaderCell>
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
export default SculptorList;

