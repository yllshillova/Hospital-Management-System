/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { useLocation, useNavigate } from "react-router-dom";
import toastNotify from "../../app/helpers/toastNotify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { useDeleteVisitMutation, useGetVisitsQuery } from "../../app/APIs/visitApi";
import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import { useGetDoctorsQuery } from "../../app/APIs/doctorApi";
import Visit from "../../app/models/Visit";
import Patient from "../../app/models/Patient";
import Doctor from "../../app/models/Doctor";
import { SD_Roles } from "../../app/utility/SD";
import withAuthorization from "../../app/hoc/withAuthorization";
import { useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";
function VisitList() {

    const doctorId = useSelector((state: RootState) => state.auth.id);
    const { data, isLoading, error } = useGetVisitsQuery(doctorId);
    console.log(data);
    const { data: doctorsData, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(null);
    const { data: patientsData, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null); 

    const navigate = useNavigate();
    const location = useLocation();
    const [deleteVisit] = useDeleteVisitMutation();

    let content;

    const handleVisitDelete = async (id: string,) => {
        const result = await deleteVisit(id);

        if ('data' in result) {
            toastNotify("Visit Deleted Successfully", "success");
        }
        else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }

    };


    if (isLoading || patientsLoading || doctorsLoading) {
        content = <MainLoader />;
    } else if (error || doctorsError || patientsError) {
        content = (
            <div>
                {(error?.data as FetchBaseQueryError) || (doctorsError?.data as FetchBaseQueryError) || (patientsError?.data as FetchBaseQueryError)}
            </div>
        );
    }
    else {
        content = data.map((visit: Visit, index: number) => {
            const patient = patientsData?.find((patient: Patient) => patient.id === visit.patientId);
            const doctor = doctorsData?.find((doctor: Doctor) => doctor.id === visit.doctorId);
            return (
                <tbody key={visit.id}>
                    <TableRow key={index}>
                        <TableCell>{doctor.name} {" "} {doctor.lastName}</TableCell>
                        <TableCell>{patient.name} {" "} {patient.lastName}</TableCell>
                        <TableCell>{visit.complaints}</TableCell>
                        <TableCell>{new Date(visit.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(visit.updatedAt).toLocaleDateString()}</TableCell>

                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/visit/" + visit.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/visit/update/" + visit.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        {/*TODO: add handler for delete*/}
                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleVisitDelete(visit.id)}>
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
                    <TableHeader>Visits List</TableHeader>
                    <AddButton onClick={() => navigate("/visit/insert")}  >
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeaderCell>Doctor</TableHeaderCell>
                            <TableHeaderCell>Patient</TableHeaderCell>
                            <TableHeaderCell>Complaints</TableHeaderCell>
                            <TableHeaderCell>Date Created </TableHeaderCell>
                            <TableHeaderCell>Date Updated </TableHeaderCell>

                        </TableHead>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default withAuthorization(VisitList , [SD_Roles.DOCTOR, SD_Roles.ADMINISTRATOR]);