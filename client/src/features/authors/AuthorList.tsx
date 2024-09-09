import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { TableCell, TableRow, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faAdd, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import { SD_Roles } from "../../app/utility/SD";
import { RootState } from "../../app/storage/redux/store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import withAuthorization from "../../app/hoc/withAuthorization";
import { useEffect, useState } from "react";
import Author from "../../app/models/Author";
import { useGetAuthorsQuery } from "../../app/APIs/authorApi";

function AuthorList() {

    const { data, isLoading, error } = useGetAuthorsQuery(null);

    const userData = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [kosovars, setKosovars] = useState<boolean>(false);
    const [displayedAuthors, setDisplayedAuthors] = useState<Author[]>([]);


    useEffect(() => {
        if (data) {


            let filteredAuthors = data;

            if (kosovars) {
                filteredAuthors = filteredAuthors.filter(
                    (author: Author) => author.country === "Kosova"
                );
            }
            else {
                filteredAuthors = data;
            }

            setDisplayedAuthors(filteredAuthors);
        }
    }, [data, kosovars]);


    const handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKosovars(e.target.checked);
    };

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
                        <ErrorDescription>{errorMessage || connectionError("authors")} </ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/author/insert")}>Insert an author </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }

    else {

        content = displayedAuthors.map((author: Author) => {
            return (
                <tbody key={author.id}>
                    <TableRow>
                        <TableCell>{author.name}</TableCell>
                        <TableCell>{new Date(author.birthDate).toLocaleDateString()}</TableCell>
                        <TableCell>{author.country}</TableCell>

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
                        <TableHeader>Author List</TableHeader>
                        <label>
                            <input
                                type="checkbox"
                                checked={kosovars}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleAuthorsChange(e)}
                            />
                            Authors form Kosova
                        </label>
                        <AddButton onClick={() => navigate("/author/insert")}  >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell> Name</TableHeaderCell>
                                <TableHeaderCell>BirthDate </TableHeaderCell>
                                <TableHeaderCell>Country </TableHeaderCell>

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
export default withAuthorization(AuthorList, [SD_Roles.ADMINISTRATOR]);