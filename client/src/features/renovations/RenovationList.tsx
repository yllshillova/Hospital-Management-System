/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon,  BackButton, ErrorMessage, ErrorDescription, ActionButton } from "../../app/common/styledComponents/table";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import {  useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { faExclamationCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import Renovation from "../../app/models/Renovation";
import { useEffect, useState } from "react";
import {  UserNotFoundMessage } from "../../app/common/styledComponents/chat";
import { Select } from "../../app/common/styledComponents/upsert";
import { useGetBuildingsQuery } from "../../app/APIs/buildingApi";
import { useDeleteRenovationMutation, useGetRenovationsQuery } from "../../app/APIs/renovationApi";
import Building from "../../app/models/Building";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import toastNotify from "../../app/helpers/toastNotify";

function RenovationList() {


    const [selectedBuilding, setSelectedBuilding] = useState<string>("");
    const { data, isLoading, error } = useGetRenovationsQuery(selectedBuilding);
    const { data: buildingsData, isLoading: buildingsLoading, error: buildingsError } = useGetBuildingsQuery(null);

    const navigate = useNavigate();

    const [RenovationNotFound, setRenovationNotFound] = useState(false);
    
    const [deleteRenovation] = useDeleteRenovationMutation();

    useEffect(() => {
        if (data) {
            setRenovationNotFound(data.length === 0);
        }
    }, [data]);


    const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBuilding(e.target.value);
    };


    const handleRenovationDelete = async (id: string,) => {
        const result = await deleteRenovation(id);
        console.log(result);

        if ('data' in result) {
            toastNotify("Renovation has been deleted", "success");
        }
        else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }

    };

    let content;

    if (isLoading || buildingsLoading) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    } else if (error || buildingsError) {
        const fetchError = (error as FetchBaseQueryError) || (buildingsError as FetchBaseQueryError);
        const errorMessage = fetchError?.data as string;
        console.log(errorMessage)
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("renovations")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage ?  (
                        <>
                        <BackButton style={{ backgroundColor: "#002147" }}
                                onClick={() => navigate("/renovation/insert")}>Insert a Renovation </BackButton>
                        </>

                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {
        if (data?.length > 0) {
            content = (
                data?.map((renovation: Renovation) => {
                    const building: Building = buildingsData?.find((building: Building) => building.id === renovation.buildingID);
                    return (
                        <tbody key={renovation.id}>
                            <TableRow>
                                <TableCell>{renovation.description}</TableCell>
                                <TableCell>{renovation.cost}</TableCell>

                                <TableCell>{building?.name}</TableCell>
                                <TableCell>{building?.location}</TableCell>

                                <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleRenovationDelete(renovation.id)}>
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
                                <TableHeader>Renovation List</TableHeader>
                                

                            <Select
                                value={selectedBuilding}
                                onChange={handleBuildingChange}>
                                <option value="">All buildings</option>
                                    {buildingsData?.map((building: Building) => (
                                        <option key={building.id} value={building.location}>
                                            {building.location}
                                        </option>
                                    ))}
                            </Select>

                                <AddButton onClick={() => navigate("/renovation/insert")}>
                                    <FontAwesomeIcon icon={faAdd} />
                                </AddButton>          
                            </TableNav>
                            <Table>
                                <thead>
                                    <TableHead>
                                        <TableHeaderCell>Description</TableHeaderCell>
                                        <TableHeaderCell>Cost</TableHeaderCell>
                                        <TableHeaderCell>Building </TableHeaderCell>
                                        <TableHeaderCell>Location </TableHeaderCell>

                                    </TableHead>
                                </thead>
                        {content}
                        {RenovationNotFound && 
                            <UserNotFoundMessage>Renovation not found</UserNotFoundMessage>}
                            </Table>
                        </OrdersTable>     
            </>
        );
    }
    return content;
}
export default RenovationList;