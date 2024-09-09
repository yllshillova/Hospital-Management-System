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
import { useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";
import { connectionError } from "../../app/utility/connectionError";
import { useEffect, useState } from "react";
import {  SearchContainer,  UserNotFoundMessage } from "../../app/common/styledComponents/chat";
//import { setSearchTerm } from "../../app/storage/redux/searchSlice";
import { useDeleteSatelliteMutation, useGetSatellitesQuery } from "../../app/APIs/satelliteApi";
import { useGetPlanetsQuery } from "../../app/APIs/planetApi";
import Satellite from "../../app/models/Satellite";
import Planet from "../../app/models/Planet";
import toastNotify from "../../app/helpers/toastNotify";
import useErrorHandler from "../../app/helpers/useErrorHandler";

function SatelliteList() {
    const { data, isLoading, error } = useGetSatellitesQuery(null);
    const { data: planetsData, isLoading: planetsLoading, error: planetsError } = useGetPlanetsQuery(null);
    const [deleteSatellite] = useDeleteSatelliteMutation();

    const navigate = useNavigate();
   // const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.auth);
    //const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

    const [displayedSatellites, setDisplayedSatellites] = useState<Satellite[]>([]);
    const [satelliteNotFound, setSatelliteNotFound] = useState(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    const findPlanetById = (planetId: string) => {
        return planetsData?.find((planet: Planet) => planet.id === planetId);
    };
    //useEffect(() => {

    //    if (data) {

    //        let filteredSatellites = data;
    //        if (searchTerm !== '') {
    //            filteredSatellites = filteredSatellites.filter(
    //                (satellite: Satellite) => {
    //                    const planet = findPlanetById(satellite.planetId);
    //                    return planet?.name.toLowerCase().includes(searchTerm.toLowerCase());
    //                }
    //            );
    //        }
    //        setDisplayedSatellites(filteredSatellites);
    //        setSatelliteNotFound(filteredSatellites.length === 0);
    //    }
    //}, [searchTerm, data]);

    useEffect(() => {
        if (data) {
            let filteredSatellites = data;

            if (isDeleted && !isActive) {
                filteredSatellites = filteredSatellites.filter(
                    (satellite: Satellite) => satellite.isDeleted
                );
            } else if (!isDeleted && isActive) {
                filteredSatellites = filteredSatellites.filter(
                    (satellite: Satellite) => !satellite.isDeleted
                );
            } else if (isDeleted && isActive) {
                filteredSatellites = data; 
            } else {
                filteredSatellites = data; 
            }

            setDisplayedSatellites(filteredSatellites);
            setSatelliteNotFound(filteredSatellites.length === 0);
        }
    }, [isDeleted, isActive, data]);


    {/*const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {*/}
    {/*    const searchTerm = e.target.value;*/}
    {/*    dispatch(setSearchTerm(searchTerm));*/}
    {/*};*/}

    const handleSatelliteDelete = async (id: string) => {
        const result = await deleteSatellite(id);

        if ('data' in result) {
            toastNotify("Satellite has been deleted ", "success");
        }
        else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }

    };
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, filterType: string) => {
        const { checked } = e.target;
        if (filterType === 'deleted') {
            setIsDeleted(checked);
        } else if (filterType === 'active') {
            setIsActive(checked);
        }
    };

    let content;

    if (isLoading || planetsLoading) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    } else if (error || planetsError) {
        const fetchError = (error as FetchBaseQueryError) || (planetsError as FetchBaseQueryError);
        const errorMessage = fetchError?.data as string;
        console.log(errorMessage)
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("satellites")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                                onClick={() => navigate("/satellite/insert")}>Insert a satellite </BackButton>

                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {
        if (displayedSatellites.length > 0) {
            content = (
                displayedSatellites.map((satellite: Satellite) => {
                    const planet = findPlanetById(satellite.planetId);
                    return (
                        <tbody key={satellite.id}>
                            <TableRow>
                                <TableCell>{satellite.name}</TableCell>
                                <TableCell>{satellite.isDeleted ? "Yes" : "No"}</TableCell>
                                <TableCell>{planet.name}</TableCell>

                                {userData.role === SD_Roles.ADMINISTRATOR &&
                                        
                                    <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleSatelliteDelete(satellite.id) }>
                                       <FontAwesomeIcon icon={faTrashAlt} />
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
                                <TableHeader>Satellite List</TableHeader>
                                <SearchContainer>
                                    {/*<SearchInput*/}
                                    {/*    type="text"*/}
                                    {/*    value={searchTerm}*/}
                                    {/*    onChange={handleSearchChange}*/}
                                    {/*    placeholder="Search satellites by planet"*/}
                                {/*/>*/}


                                    {/*{searchTerm && (*/}
                                    {/*    <CancelButton onClick={() => dispatch(setSearchTerm(''))}>*/}
                                    {/*        Cancel*/}
                                    {/*    </CancelButton>*/}
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isDeleted}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleFilterChange(e, 'deleted')}
                                />
                                Show Deleted
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleFilterChange(e, 'active')}
                                />
                                Show Active
                            </label>
                            
                                </SearchContainer>
                                    {userData.role == SD_Roles.ADMINISTRATOR &&
                                        <AddButton onClick={() => navigate("/satellite/insert")}>
                                            <FontAwesomeIcon icon={faAdd} />
                                        </AddButton>
                                    }
                            </TableNav>
                            <Table>
                                <thead>
                                    <TableHead>
                                        <TableHeaderCell>Name</TableHeaderCell>
                                        <TableHeaderCell>Is Deleted</TableHeaderCell>
                                        <TableHeaderCell>Planet </TableHeaderCell>
                                    </TableHead>
                                </thead>
                        {content}
                        {satelliteNotFound && 
                            <UserNotFoundMessage>Satellite not found</UserNotFoundMessage>}
                            </Table>
                        </OrdersTable>     
            </>
        );
    }
    return content;
}
export default withAuthorization(SatelliteList, [SD_Roles.ADMINISTRATOR]);