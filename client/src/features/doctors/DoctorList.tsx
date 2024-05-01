/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toastNotify from "../../app/helpers/toastNotify";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useDeleteDoctorMutation, useGetDoctorsQuery } from "../../app/APIs/doctorApi";
import Doctor from "../../app/models/Doctor";
import { useGetDepartmentsQuery } from "../../app/APIs/departmentApi";
import MiniLoader from "../../app/common/MiniLoader";
import Department from "../../app/models/Department";
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
    let content;



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



    if (isLoading) {
        content = <MainLoader />;
    } else if (error) {
        content = <div>{(error.data as FetchBaseQueryError)}</div>;
    }
    else {
        content = data.map((doctor: Doctor) => {
            return (
                <tbody key={doctor.id}>
                    <TableRow>
                        <TableCell>{doctor.name}</TableCell>
                        <TableCell>{doctor.lastName} </TableCell>
                        {/*<TableCell>{doctor.email} </TableCell>*/}
                        <TableCell>{doctor.specialization} </TableCell>
                        {/*<TableCell>{doctor.residence} </TableCell>*/}
                        {/*<TableCell>{doctor.address} </TableCell>*/}
                        {/*<TableCell>{doctor.gender} </TableCell>*/}
                        {/*<TableCell>{new Date(doctor.birthday).toLocaleDateString()}</TableCell>*/}
                        <TableCell>{isDepartmentsLoading ? (
                            <MiniLoader />
                        ) : getDepartmentName(doctor.departmentId)} </TableCell>
                        {/*<TableCell>{new Date(doctor.createdAt).toLocaleDateString()}</TableCell>*/}
                        {/*<TableCell>{new Date(doctor.updatedAt).toLocaleDateString()}</TableCell>*/}
                        <TableCell>{doctor.isDeleted} </TableCell>

                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/doctor/" + doctor.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/doctor/update/" + doctor.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        {/*TODO: add handler for delete*/}
                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleDoctorDelete(doctor.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </ActionButton>
                    </TableRow>
                </tbody>
            );
        });
    }

    return (
        <>
            <Header />
            <SidePanel />
            <OrdersTable>
                <TableNav>
                    <TableHeader>Doctors List</TableHeader>
                    <AddButton  onClick={() => navigate("/doctor/insert")}  >
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Last Name</TableHeaderCell>
                            {/*<TableHeaderCell>Email</TableHeaderCell>*/}
                            <TableHeaderCell>Specialization</TableHeaderCell>
                            {/*<TableHeaderCell>Residence</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Address</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Gender</TableHeaderCell>*/}
                            {/*<TableHeaderCell>Birthday</TableHeaderCell>*/}
                            <TableHeaderCell>Department</TableHeaderCell>
                            {/*<TableHeaderCell>CreatedAt</TableHeaderCell>*/}
                            {/*<TableHeaderCell>UpdatedAt</TableHeaderCell>*/}
                            <TableHeaderCell>IsDeleted</TableHeaderCell>
                        </TableHead>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default DoctorList;