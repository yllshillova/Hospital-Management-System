/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon,  BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import {  useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { faExclamationCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import {  useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";
import { connectionError } from "../../app/utility/connectionError";
import { useEffect, useState } from "react";
import { UserNotFoundMessage } from "../../app/common/styledComponents/chat";
import { Select } from "../../app/common/styledComponents/upsert";
import { useGetBuildingsQuery } from "../../app/APIs/buildingApi";
import Renovation from "../../app/models/Renovation";
import Building from "../../app/models/Building";
import { useDeleteRenovationMutation, useGetRenovationsQuery } from "../../app/APIs/renovationApi";
import toastNotify from "../../app/helpers/toastNotify";
import useErrorHandler from "../../app/helpers/useErrorHandler";

function RenovationList() {
    const { data, isLoading, error } = useGetRenovationsQuery(null);
    const { data: buildingsData, isLoading: buildingsLoading, error: buildingsError } = useGetBuildingsQuery(null);
    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.auth);

    const [displayedRenovations, setDisplayedRenovations] = useState<Renovation[]>([]);
    const [renovationNotFound, setRenovationNotFound] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState<string>("");
    const [deleteRenovation] = useDeleteRenovationMutation();


    const handleRenovationDelete = async (id: string,) => {
        const result = await deleteRenovation(id);

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



    useEffect(() => {
        if (data && buildingsData) {

            let filteredRenovations = data;

            if (selectedBuilding !== '') {
                filteredRenovations = filteredRenovations.filter(
                    (renovation: Renovation) => {
                        const building = buildingsData.find((building: Building) => building.id === renovation.buildingID);
                        return building?.location === selectedBuilding;
                    }
                );
            } else {
                filteredRenovations = data;
            }

            setDisplayedRenovations(filteredRenovations);
            setRenovationNotFound(filteredRenovations.length === 0);
        }
    }, [data, selectedBuilding, buildingsData]);


    

    const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBuilding(e.target.value);
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
                        <ErrorDescription>{errorMessage || connectionError("buildings")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <>
                        <BackButton style={{ backgroundColor: "#002147" }}
                                onClick={() => navigate("/renovation/insert")}>Insert a renovation </BackButton>
                        </>

                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {
        if (displayedRenovations.length > 0) {
            content = (
                displayedRenovations.map((renovation: Renovation) => {
                    const building = buildingsData?.find((building: Building) => building.id === renovation.buildingID);
                    return (
                        <tbody key={renovation.id}>
                            <TableRow>
                                <TableCell>{renovation.description}</TableCell>
                                <TableCell>{building?.name}</TableCell>
                                <TableCell>{renovation.cost}</TableCell>
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
                                <option value="">All Buildings</option>
                                    {buildingsData?.map((building: Building) => (
                                        <option key={building.id} value={building.location}>
                                            {building.location}
                                    </option>
                                ))}
                            </Select>

                            {userData.role == SD_Roles.ADMINISTRATOR &&
                                <AddButton onClick={() => navigate("/renovation/insert")}>
                                    <FontAwesomeIcon icon={faAdd} />
                                </AddButton>          
                             }               
                            </TableNav>
                            <Table>
                                <thead>
                                    <TableHead>
                                        <TableHeaderCell>Description</TableHeaderCell>
                                        <TableHeaderCell>Building</TableHeaderCell>
                                        <TableHeaderCell>Cost </TableHeaderCell>

                                    </TableHead>
                                </thead>
                        {content}
                        {renovationNotFound && 
                            <UserNotFoundMessage>Renovation not found</UserNotFoundMessage>}
                            </Table>
                        </OrdersTable>     
            </>
        );
    }
    return content;
}
export default withAuthorization(RenovationList, [SD_Roles.ADMINISTRATOR]);