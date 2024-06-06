/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteAppointmentMutation, useGetAppointmentsQuery } from "../../app/APIs/appointmentApi";
import MainLoader from "../../app/common/MainLoader";
import Appointment from "../../app/models/Appointment";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
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
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";
import { useGetDoctorsQuery } from "../../app/APIs/doctorApi";
import User from "../../app/models/User";
import { connectionError } from "../../app/utility/connectionError";


function AppointmentList() {
    const { data: appointmentData, isLoading: isAppointmentLoading, error: appointmentError } = useGetAppointmentsQuery(null);
    const { data: patientData, isLoading: isPatientLoading, error: patientError } = useGetPatientsQuery(null);
    const { data: doctorData, isLoading: isDoctorLoading, error: doctorError } = useGetDoctorsQuery(null);

    const [deleteAppointment] = useDeleteAppointmentMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const userData: User = useSelector(
        (state: RootState) => state.auth
    );

    let content;

    const handleAppointmentDelete = async (id: string) => {
        const result = await deleteAppointment(id);

        if ('data' in result) {
            toastNotify("Appointment has been deleted", "success");
        } else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }
    };

    if (isAppointmentLoading || isPatientLoading || isDoctorLoading)  {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    } else if (appointmentError || patientError || doctorError) {
        const errorMessage = ((appointmentError as FetchBaseQueryError)?.data || (patientError as FetchBaseQueryError)?.data || (doctorError as FetchBaseQueryError)?.data) as string;

        return (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{connectionError("appointments") || errorMessage}</ErrorDescription>
                    </ErrorTitleRow>
                    <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                </ErrorMessage>
            </>
        );
    } else {
        content = appointmentData.map((appointment: Appointment) => {
            // Find the corresponding doctor and patient data
            const doctor = doctorData.find((doc: { id: string; }) => doc.id === appointment.doctorId);
            const patient = patientData.find((pat: { id: string; }) => pat.id === appointment.patientId);

            return (
                <tbody key={appointment.id}>
                    <TableRow>

                        <TableCell>{doctor.name} {" "} {doctor.lastName}</TableCell>
                        <TableCell>{patient.name} {" "} {patient.lastName}</TableCell>

                        <TableCell>{new Date(appointment.checkInDate!).toLocaleString()}</TableCell>
                        <TableCell>{new Date(appointment.checkOutDate!).toLocaleString()}</TableCell>


                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/appointment/" + appointment.id)}>
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>

                        {userData.role == SD_Roles.NURSE &&
                            <>
                                <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/appointment/update/" + appointment.id)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </ActionButton>
                                <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleAppointmentDelete(appointment.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </ActionButton>
                            </>
                        }
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

                    {userData.role == SD_Roles.NURSE &&
                        <AddButton onClick={() => navigate("/appointment/insert")}>
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    }
                </TableNav>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeaderCell>Doctor</TableHeaderCell>
                            <TableHeaderCell>Patient</TableHeaderCell>
                            <TableHeaderCell>Check In Date</TableHeaderCell>
                            <TableHeaderCell>Check Out Date</TableHeaderCell>
                        </TableHead>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default withAuthorization(AppointmentList, [SD_Roles.ADMINISTRATOR, SD_Roles.NURSE]);