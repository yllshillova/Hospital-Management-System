/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorDescription } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { faExclamationCircle, faInfo } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toastNotify from "../../app/helpers/toastNotify";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useDeleteDoctorMutation, useGetDoctorsQuery } from "../../app/APIs/doctorApi";
import Doctor from "../../app/models/Doctor";
import { useGetDepartmentsQuery } from "../../app/APIs/departmentApi";
import MiniLoader from "../../app/common/MiniLoader";
import Department from "../../app/models/Department";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from '../../app/utility/SD';
import { ErrorMessage } from "../../app/common/styledComponents/details";
import { RootState } from "../../app/storage/redux/store";
import { useSelector } from "react-redux";
import User from "../../app/models/User";
import { connectionError } from "../../app/utility/connectionError";

function DoctorList() {
    const { data, isLoading, error } = useGetDoctorsQuery(null);
    const { data: departments, isLoading: isDepartmentsLoading } = useGetDepartmentsQuery(null);

    const departmentMap = new Map<string, string>();
    departments?.forEach((department: Department) => {
        departmentMap.set(department.id, department.name);
    });

    const getDepartmentName = (departmentId: string) => {
        return departmentMap.get(departmentId) || "Department not found!";
    };

    const [deleteDoctor] = useDeleteDoctorMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const userData: User = useSelector(
        (state: RootState) => state.auth
    );

    const handleDoctorDelete = async (id: string,) => {
        const result = await deleteDoctor(id);

        if ('data' in result) {
            toastNotify("Doctor Deleted Successfully", "success");
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
                        <ErrorDescription>{errorMessage || connectionError("doctors")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.ADMINISTRATOR ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/doctor/insert")}>Insert a doctor </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {

        content = data.map((doctor: Doctor) => {
            return (
                <tbody key={doctor.id}>
                    <TableRow>
                        <TableCell>{doctor.name}</TableCell>
                        <TableCell>{doctor.lastName} </TableCell>
                        <TableCell>{doctor.email} </TableCell>
                        <TableCell>{isDepartmentsLoading ? (
                            <MiniLoader />
                        ) : getDepartmentName(doctor.departmentId)} </TableCell>
                        <TableCell>{doctor.residence} </TableCell>

                        {/*<TableCell>{doctor.isDeleted} </TableCell>*/}
                        {/*<TableCell>{new Date(doctor.createdAt).toLocaleDateString()}</TableCell>*/}
                        {/*<TableCell>{new Date(doctor.updatedAt).toLocaleDateString()}</TableCell>*/}


                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/doctor/" + doctor.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>

                        {userData.role == SD_Roles.ADMINISTRATOR && 
                            <>
                                <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/doctor/update/" + doctor.id)} >
                                    <FontAwesomeIcon icon={faEdit} />
                                </ActionButton>

                                <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleDoctorDelete(doctor.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </ActionButton>
                            </>
                        }
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
                        <TableHeader>Doctors List</TableHeader>
                        {userData.role == SD_Roles.ADMINISTRATOR &&
                            <>
                                <AddButton  onClick={() => navigate("/doctor/insert")}  >
                                    <FontAwesomeIcon icon={faAdd} />
                                </AddButton>
                            </>
                        }
                        </TableNav>
                        <Table>
                            <thead>
                                <TableHead>
                                    <TableHeaderCell>Name</TableHeaderCell>
                                    <TableHeaderCell>Last Name</TableHeaderCell>
                                    <TableHeaderCell>Email</TableHeaderCell>

                                    <TableHeaderCell>Department</TableHeaderCell>
                                    <TableHeaderCell>Residence</TableHeaderCell>

                                    {/*<TableHeaderCell>Is Deleted</TableHeaderCell>*/}
                                    {/*<TableHeaderCell>Date Created </TableHeaderCell>*/}
                                    {/*<TableHeaderCell>Date Updated </TableHeaderCell>*/}
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

export default withAuthorization(DoctorList, [SD_Roles.ADMINISTRATOR, SD_Roles.NURSE]);