/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon,  BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import {  useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { faExclamationCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";
import { connectionError } from "../../app/utility/connectionError";
import Sculpture from "../../app/models/Sculpture";
import { useEffect, useState } from "react";
import { CancelButton, SearchContainer, SearchInput, UserNotFoundMessage } from "../../app/common/styledComponents/chat";
import { setSearchTerm } from "../../app/storage/redux/searchSlice";
import { useDeleteSculptureMutation, useGetSculpturesQuery } from "../../app/APIs/sculptureApi";
import { useGetSculptorsQuery } from "../../app/APIs/sculptorApi";
import Sculptor from "../../app/models/Sculptor";
import toastNotify from "../../app/helpers/toastNotify";
import useErrorHandler from "../../app/helpers/useErrorHandler";

function SculptureList() {

    const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

    const { data, isLoading, error } = useGetSculpturesQuery(searchTerm || undefined);
    const { data: sculptorsData, isLoading: sculptorsLoading, error: sculptorsError } = useGetSculptorsQuery(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [SculptureNotFound, setSculptureNotFound] = useState(false);
    const [deleteSculpture] = useDeleteSculptureMutation();

    useEffect(() => {
        if (data) {

            setSculptureNotFound(data.length === 0);
        }
    }, [searchTerm, data ]);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        dispatch(setSearchTerm(newSearchTerm));
    };

   

    const handleSculptureDelete = async (id: string,) => {
        const result = await deleteSculpture(id);
        console.log(result);

        if ('data' in result) {
            toastNotify("Sculpture has been deleted", "success");
        }
        else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }

    };

    const handleInsertSculpture = () => {
        dispatch(setSearchTerm('')); // Clear search term
        navigate("/sculpture/insert"); // Navigate to insert page
    };

    const handleBackNavigation = () => {
        dispatch(setSearchTerm('')); // Clear search term
        navigate(-1); // Go back in history
    };



    let content;

    if (isLoading || sculptorsLoading) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    } else if (error || sculptorsError) {
        const fetchError = (error as FetchBaseQueryError) || (sculptorsError as FetchBaseQueryError);
        const errorMessage = fetchError?.data as string;
        console.log(errorMessage)
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("sculptures")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage ? (
                        <BackButton
                            style={{ backgroundColor: "#002147" }}
                            onClick={handleInsertSculpture}>
                            Insert a Sculpture
                        </BackButton>
                    ) : (
                        <BackButton onClick={handleBackNavigation}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {
        if (data?.length > 0) {
            content = (
                data?.map((sculpture: Sculpture) => {
                    const sculptor = sculptorsData?.find((sculptor: Sculptor) => sculptor.id === sculpture.sculptorId);
                    return (
                        <tbody key={ sculpture.id}>
                            <TableRow>

                                <TableCell>{sculpture.title}</TableCell>
                                <TableCell>{sculpture.material}</TableCell>
                                <TableCell>{sculpture.isDeleted ? "Yes" : "No"}</TableCell>
                                <TableCell>{sculptor?.name}</TableCell>
                                <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleSculptureDelete(sculpture.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </ActionButton>
                                
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
                                <TableHeader>Sculpture List</TableHeader>
                                <SearchContainer>
                                    <SearchInput
                                        type="text"
                                        placeholder="Search by sculptor"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    {searchTerm && (
                                        <CancelButton onClick={() => dispatch(setSearchTerm(''))}>
                                            Cancel
                                        </CancelButton>
                            )}
                                </SearchContainer>

                            

                           
                                <AddButton onClick={() => navigate("/sculpture/insert")}>
                                    <FontAwesomeIcon icon={faAdd} />
                                </AddButton>          
                            </TableNav>
                            <Table>
                                <thead>
                                    <TableHead>
                                        <TableHeaderCell>Title</TableHeaderCell>
                                <TableHeaderCell>Material</TableHeaderCell>
                                <TableHeaderCell>Is Deleted</TableHeaderCell>

                                        <TableHeaderCell>Sculptor </TableHeaderCell>
                                    </TableHead>
                                </thead>
                        {content}
                        {SculptureNotFound && 
                            <UserNotFoundMessage>Sculpture not found</UserNotFoundMessage>}
                            </Table>
                        </OrdersTable>     
            </>
        );
    }
    return content;
}
export default SculptureList;