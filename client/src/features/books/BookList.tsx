/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon,  BackButton, ErrorMessage, ErrorDescription, OrdersTable } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import {  useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import { useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";
import { connectionError } from "../../app/utility/connectionError";
import { useEffect, useState } from "react";
import { UserNotFoundMessage } from "../../app/common/styledComponents/chat";
import { Select } from "../../app/common/styledComponents/upsert";
import Book from "../../app/models/Book";
import Product from "../../app/models/Product";
import { useGetBooksQuery } from "../../app/APIs/bookApi";
import { useGetAuthorsQuery } from "../../app/APIs/authorApi";
import Author from "../../app/models/Author";

function BookList() {
    const { data, isLoading, error } = useGetBooksQuery(null);
    const { data: authorsData, isLoading: authorsLoading, error: authorsError } = useGetAuthorsQuery(null);
    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.auth);

    const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
    const [bookNotFound, setBookNotFound] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState<string>('');

    useEffect(() => {
        if (data) {

            let filteredBooks = data;

            
            if (selectedAuthor !== '') {
                filteredBooks = filteredBooks.filter(
                    (Book: Book) => Book.authorId === selectedAuthor
                );
            }

            setDisplayedBooks(filteredBooks);
            setBookNotFound(filteredBooks.length === 0);
        }
    }, [data, selectedAuthor]);


   

    const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAuthor(e.target.value);
    };


    let content;

    if (isLoading || authorsLoading) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    } else if (error || authorsError) {
        const fetchError = (error as FetchBaseQueryError) || (authorsError as FetchBaseQueryError);
        const errorMessage = fetchError?.data as string;
        console.log(errorMessage)
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("books")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <>
                        <BackButton style={{ backgroundColor: "#002147" }}
                                onClick={() => navigate("/book/insert")}>Insert a Book </BackButton>
                        </>

                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {
        if (displayedBooks.length > 0) {
            content = (
                displayedBooks.map((book: Book) => {
                    const author = authorsData?.find((author: Product) => author.id === book.authorId);
                    return (
                        <tbody key={book.id}>
                            <TableRow>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.genre}</TableCell>
                                <TableCell>{author.name}</TableCell>

                                {userData.role === SD_Roles.ADMINISTRATOR &&
                                    <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate(`/book/update/${book.id}`)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </ActionButton>
                                }
                            </TableRow>
                        </tbody>
                    );
                })
            )
        }

        content = (
            <>
                        <Header />
                        <SidePanel />
                        <OrdersTable>
                            <TableNav>
                                <TableHeader>Book List</TableHeader>
                                

                            <Select
                                value={selectedAuthor}
                                onChange={handleAuthorChange}>
                                <option value="">All authors</option>
                                {authorsData?.map((author: Author) => (
                                    <option key={author.id} value={author.id}>
                                        {author.name}
                                    </option>
                                ))}
                            </Select>

                            {userData.role == SD_Roles.ADMINISTRATOR &&
                                <AddButton onClick={() => navigate("/book/insert")}>
                                    <FontAwesomeIcon icon={faAdd} />
                                </AddButton>          
                             }               
                            </TableNav>
                            <Table>
                                <thead>
                                    <TableHead>
                                        <TableHeaderCell>Title</TableHeaderCell>
                                        <TableHeaderCell>Genre</TableHeaderCell>
                                        <TableHeaderCell>Author </TableHeaderCell>
                                    </TableHead>
                                </thead>
                        {content}
                        {bookNotFound && 
                            <UserNotFoundMessage>Book not found</UserNotFoundMessage>}
                            </Table>
                        </OrdersTable>     
            </>
        );
    }
    return content;
}
export default withAuthorization(BookList, [SD_Roles.ADMINISTRATOR]);