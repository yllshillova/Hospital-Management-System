/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon,  BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import {  useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { SD_Roles } from "../../app/utility/SD";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";
import { connectionError } from "../../app/utility/connectionError";
import { useGetContractsQuery } from "../../app/APIs/contractApi";
import Contract from "../../app/models/Contract";
import { useGetEmployeesQuery } from "../../app/APIs/employeeApi";
import Employee from "../../app/models/Employee";
import { useEffect, useState } from "react";
import { CancelButton, SearchContainer, SearchInput, UserNotFoundMessage } from "../../app/common/styledComponents/chat";
import { Select } from "../../app/common/styledComponents/upsert";
import { setSearchTerm } from "../../app/storage/redux/searchSlice";

function ContractList() {
    const { data, isLoading, error } = useGetContractsQuery(null);
    const { data: employeesData, isLoading: employeesLoading, error: employeesError } = useGetEmployeesQuery(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.auth);
    const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

    const [displayedContracts, setDisplayedContracts] = useState<Contract[]>([]);
    const [contractNotFound, setContractNotFound] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<string>('');

    useEffect(() => {
        if (data) {

            //const startDateRange = new Date(2001, 5, 20); // June 20, 2005
            //const endDateRange = new Date(2010, 4, 30); // May 30, 2010

            //let filteredContracts = data.filter((contract: Contract) => {
            //    const contractStartDate = new Date(contract.startDate);
            //    return contractStartDate >= startDateRange && contractStartDate <= endDateRange;
            //});

            let filteredContracts = data;

            if (searchTerm !== '') {
                filteredContracts = filteredContracts.filter(
                    (contract: Contract) =>
                    contract.startDate.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (selectedEmployee !== '') {
                filteredContracts = filteredContracts.filter(
                    (contract: Contract) => contract.employeeId === selectedEmployee
                );
            }

            setDisplayedContracts(filteredContracts);
            setContractNotFound(filteredContracts.length === 0);
        }
    }, [searchTerm, data, selectedEmployee]);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        dispatch(setSearchTerm(searchTerm));
    };

    const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEmployee(e.target.value);
    };


    let content;

    if (isLoading || employeesLoading) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    } else if (error || employeesError) {
        const fetchError = (error as FetchBaseQueryError) || (employeesError as FetchBaseQueryError);
        const errorMessage = fetchError?.data as string;
        console.log(errorMessage)
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("contracts")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <>
                        <BackButton style={{ backgroundColor: "#002147" }}
                                onClick={() => navigate("/contract/insert")}>Insert a contract </BackButton>
                        </>

                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {
        if (displayedContracts.length > 0) {
            content = (
                displayedContracts.map((contract: Contract) => {
                    const employee = employeesData?.find((employee: Employee) => employee.id === contract.employeeId);
                    return (
                        <tbody key={contract.id}>
                            <TableRow>
                                <TableCell>{contract.name}</TableCell>
                                <TableCell>{new Date(contract.startDate).toLocaleDateString()}</TableCell>
                                <TableCell>{employee?.fullName}</TableCell>
                                {userData.role === SD_Roles.ADMINISTRATOR &&
                                    <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate(`/contract/update/${contract.id}`)}>
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
                                <TableHeader>Contract List</TableHeader>
                                <SearchContainer>
                                    <SearchInput
                                        type="date"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    {searchTerm && (
                                        <CancelButton onClick={() => dispatch(setSearchTerm(''))}>
                                            Cancel
                                        </CancelButton>
                            )}
                                </SearchContainer>

                            <Select
                                value={selectedEmployee}
                                onChange={handleEmployeeChange}>
                                <option value="">All Employees</option>
                                {employeesData?.map((employee: Employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.fullName}
                                    </option>
                                ))}
                            </Select>

                            {userData.role == SD_Roles.ADMINISTRATOR &&
                                <AddButton onClick={() => navigate("/contract/insert")}>
                                    <FontAwesomeIcon icon={faAdd} />
                                </AddButton>          
                             }               
                            </TableNav>
                            <Table>
                                <thead>
                                    <TableHead>
                                        <TableHeaderCell>Name</TableHeaderCell>
                                        <TableHeaderCell>Start Date</TableHeaderCell>
                                        <TableHeaderCell>Employee </TableHeaderCell>
                                    </TableHead>
                                </thead>
                        {content}
                        {contractNotFound && 
                            <UserNotFoundMessage>Contract not found</UserNotFoundMessage>}
                            </Table>
                        </OrdersTable>     
            </>
        );
    }
    return content;
}
export default ContractList;