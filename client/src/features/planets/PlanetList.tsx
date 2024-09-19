import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faAdd, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import { SD_Roles } from "../../app/utility/SD";
import { RootState } from "../../app/storage/redux/store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import withAuthorization from "../../app/hoc/withAuthorization";
import { useGetPlanetsQuery } from "../../app/APIs/planetApi";
import Planet from "../../app/models/Planet";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";

function PlanetList() {

    const { data, isLoading, error } = useGetPlanetsQuery(null);

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
                        <ErrorDescription>{errorMessage || connectionError("planets")} </ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/planet/insert")}>Insert a planet </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }

    else {
        content = data.map((planet: Planet) => {
            return (
                <tbody key={planet.id}>
                    <TableRow>
                        <TableCell>{planet.name}</TableCell>
                        <TableCell>{planet.type}</TableCell>
                        <TableCell>{planet.isDeleted ? "Yes" : "No"}</TableCell>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/planet/update/" + planet.id)} >
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
                        <TableHeader>Employee List</TableHeader>
                        <AddButton onClick={() => navigate("/planet/insert")}  >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell> Name</TableHeaderCell>
                                <TableHeaderCell> Type</TableHeaderCell>
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
export default withAuthorization(PlanetList, [SD_Roles.ADMINISTRATOR]);