import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useGetBotuesitQuery } from "../../app/APIs/botuesiApi";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { TableCell, TableRow, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription, ActionButton } from "../../app/common/styledComponents/table";
import { faAdd, faEdit, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Botuesi from "../../app/models/Botuesi";

function BotuesiList() {

    const { data, isLoading, error } = useGetBotuesitQuery(null);

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
                        <ErrorDescription>{errorMessage || connectionError("botuesit")} </ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/botuesi/insert")}>Insert a Botues </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }

    else {
        content = data.map((Botuesi: Botuesi) => {
            return (
                <tbody key={Botuesi.id}>
                    <TableRow>
                        <TableCell>{Botuesi.publisherName}</TableCell>
                        <TableCell>{Botuesi.location}</TableCell>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/botuesi/update/" + Botuesi.id)} >
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
                        <TableHeader>Botuesi List</TableHeader>
                        <AddButton onClick={() => navigate("/botuesi/insert")}  >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell>Publisher Name</TableHeaderCell>
                                <TableHeaderCell>Location </TableHeaderCell>
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
export default BotuesiList;