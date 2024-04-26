/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteAppointmentMutation, useGetAppointmentsQuery } from "../../app/APIs/appointmentApi";
import MainLoader from "../../app/common/MainLoader";
import Appointment from "../../app/models/Appointment";
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
import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import { useGetDoctorsQuery } from "../../app/APIs/doctorApi";

function AppointmentList() {
    const { data: appointmentData, isLoading: isAppointmentLoading, error: appointmentError } = useGetAppointmentsQuery(null);
    const { data: doctorData, isLoading: isDoctorLoading, error: doctorError } = useGetDoctorsQuery(null);
    const { data: patientData, isLoading: isPatientLoading, error: patientError } = useGetPatientsQuery(null);
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const navigate = useNavigate();
    const location = useLocation();
    let content;

    const handleAppointmentDelete = async (id: number) => {
        const result = await deleteAppointment(id);

        if ('data' in result) {
            toastNotify("Appointment Deleted Successfully", "success");
        } else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }
    };

    if (isAppointmentLoading  || isDoctorLoading || isPatientLoading)  {
        content = <MainLoader />;
    } else if (appointmentError   ||doctorError || patientError) {
        content = <div>Error loading data.</div>;
    } else {
        content = appointmentData.map((appointment: Appointment) => {
            // Find the corresponding doctor and patient data
            const doctor = doctorData.find((doc: { id: number; }) => doc.id === appointment.doctorId);
            const patient = patientData.find((pat: { id: number; }) => pat.id === appointment.patientId);

            return (
                <tbody key={appointment.id}>
                    <TableRow>
                        <TableCell>{new Date(appointment.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(appointment.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(appointment.checkInDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(appointment.checkOutDate).toLocaleDateString()}</TableCell>
                        <TableCell>{appointment.status}</TableCell>
                        <TableCell>{appointment.reason}</TableCell>
                        <TableCell>{appointment.notes}</TableCell>
                        <TableCell>{doctor ? doctor.name : "N/A"}</TableCell>
                        <TableCell>{patient ? patient.name : "N/A"}</TableCell>
                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/appointment/" + appointment.id)}>
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/appointment/update/" + appointment.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleAppointmentDelete(appointment.id)}>
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
                    <TableHeader>Appointments List</TableHeader>
                    <AddButton style={{ backgroundColor: "#1a252e" }} onClick={() => navigate("/appointmentUpsert")}>
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeaderCell>CreatedAt</TableHeaderCell>
                            <TableHeaderCell>UpdatedAt</TableHeaderCell>
                            <TableHeaderCell>CheckInDate</TableHeaderCell>
                            <TableHeaderCell>CheckOutDate</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>Reason</TableHeaderCell>
                            <TableHeaderCell>Notes</TableHeaderCell>
                            <TableHeaderCell>Doctor</TableHeaderCell>
                            <TableHeaderCell>Patient</TableHeaderCell>
                        </TableHead>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default AppointmentList;

