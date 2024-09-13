import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faAdd, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { useGetBuildingsQuery } from "../../app/APIs/buildingApi";
import Building from "../../app/models/Building";

function BuildingList() {

    const { data, isLoading, error } = useGetBuildingsQuery(null);

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
        console.log(errorMessage);
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("buildings")} </ErrorDescription>

                    </ErrorTitleRow>
                    {errorMessage ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/building/insert")}>Insert a building </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }

    else {
        content = data.map((building: Building) => {
            return (
                <tbody key={building.id}>
                    <TableRow>
                        <TableCell>{building.name}</TableCell>
                        <TableCell>{building.location}</TableCell>
                        
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
                        <TableHeader>Building List</TableHeader>
                        <AddButton onClick={() => navigate("/building/insert")}  >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell> Name</TableHeaderCell>
                                <TableHeaderCell> Location</TableHeaderCell>
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
export default BuildingList;