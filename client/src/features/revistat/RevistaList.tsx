/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon,  BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import {  useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
import Revista from "../../app/models/Revista";
import { useEffect, useState } from "react";
import {  UserNotFoundMessage } from "../../app/common/styledComponents/chat";
import { Select } from "../../app/common/styledComponents/upsert";
import { useGetBotuesitQuery } from "../../app/APIs/botuesiApi";
import { useGetRevistatQuery } from "../../app/APIs/revistaApi";
import Botuesi from "../../app/models/Botuesi";

function RevistaList() {


    const [selectedBotuesi, setSelectedBotuesi] = useState<string>("");
    const { data, isLoading, error } = useGetRevistatQuery(null);
    const { data: botuesitData, isLoading: botuesitLoading, error: botuesitError } = useGetBotuesitQuery(null);
    const navigate = useNavigate();

    const [RevistaNotFound, setRevistaNotFound] = useState(false);
    

    
    const [displayedRevistat, setDisplayedRevistas] = useState<Revista[]>([]);

    const findBotuesiById = (BotuesiId: string) => {
        return botuesitData?.find((Botuesi: Botuesi) => Botuesi.id === BotuesiId);
    };
    useEffect(() => {

        if (data) {

            let filteredRevistas = data;
            if (selectedBotuesi !== '') {
                filteredRevistas = filteredRevistas.filter(
                    (Revista: Revista) => {
                        const Botuesi = findBotuesiById(Revista.publisherId);
                         return Botuesi?.location === selectedBotuesi  ;
                    }
                );
            }
            setDisplayedRevistas(filteredRevistas);
            setRevistaNotFound(filteredRevistas.length === 0);
        }
    }, [selectedBotuesi, data]);


    const handleBotuesiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBotuesi(e.target.value);
    };


    let content;

    if (isLoading || botuesitLoading) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    } else if (error || botuesitError) {
        const fetchError = (error as FetchBaseQueryError) || (botuesitError as FetchBaseQueryError);
        const errorMessage = fetchError?.data as string;
        console.log(errorMessage)
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("revistat")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage ?  (
                        <>
                        <BackButton style={{ backgroundColor: "#002147" }}
                                onClick={() => navigate("/revista/insert")}>Insert a Revista </BackButton>
                        </>

                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {
        if (displayedRevistat?.length > 0) {
            content = (
                displayedRevistat?.map((Revista: Revista) => {
                    const Botuesi: Botuesi = botuesitData?.find((Botuesi: Botuesi) => Botuesi.id === Revista.publisherId);
                    return (
                        <tbody key={Revista.id}>
                            <TableRow>
                                <TableCell>{Revista.magazineName}</TableCell>
                                <TableCell>{Revista.issueNumber}</TableCell>

                                <TableCell>{Botuesi?.publisherName}</TableCell>
                                <TableCell>{Botuesi?.location}</TableCell>

                                
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
                                <TableHeader>Revista List</TableHeader>
                                

                            <Select
                                value={selectedBotuesi}
                                onChange={handleBotuesiChange}>
                                <option value="">All Botuesit</option>
                                    {botuesitData?.map((Botuesi: Botuesi) => (
                                        <option key={Botuesi.id} value={Botuesi.location}>
                                            {Botuesi.location}
                                        </option>
                                    ))}
                            </Select>

                                <AddButton onClick={() => navigate("/revista/insert")}>
                                    <FontAwesomeIcon icon={faAdd} />
                                </AddButton>          
                            </TableNav>
                            <Table>
                                <thead>
                                    <TableHead>
                                <TableHeaderCell>Magazine Name</TableHeaderCell>
                                <TableHeaderCell>Issue Number</TableHeaderCell>
                                <TableHeaderCell>Publisher Name </TableHeaderCell>
                                <TableHeaderCell>Location </TableHeaderCell>

                                    </TableHead>
                                </thead>
                        {content}
                        {RevistaNotFound && 
                            <UserNotFoundMessage>Revista not found</UserNotFoundMessage>}
                            </Table>
                        </OrdersTable>     
            </>
        );
    }
    return content;
}
export default RevistaList;