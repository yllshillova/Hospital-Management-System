/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorMessage, BackButton, ErrorTitleRow, ErrorIcon, ErrorDescription } from "../../app/common/styledComponents/table";
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
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";
function VisitList() {

    const userData = useSelector((state: RootState) => state.auth);
    const { data, isLoading, error } = useGetVisitsQuery(userData.id);
    const { data: doctorsData, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(null);
    const { data: patientsData, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null); 

    const navigate = useNavigate();
    const location = useLocation();
    const [deleteVisit] = useDeleteVisitMutation();


    const handleVisitDelete = async (id: string,) => {
        const result = await deleteVisit(id);

        if ('data' in result) {
            toastNotify("Visit has been deleted", "success");
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

    if (isLoading || patientsLoading || doctorsLoading) {
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

    else if (error || doctorsError || patientsError) {
         const fetchError = (error as FetchBaseQueryError) || (patientsError as FetchBaseQueryError) || (doctorsError as FetchBaseQueryError) ;
         const errorMessage = fetchError?.data as string ;

         content = (
                <>
                    <Header />
                    <SidePanel />
                    <ErrorMessage>
                        <ErrorTitleRow>
                            <ErrorIcon icon={faExclamationCircle} />
                            <ErrorDescription>{errorMessage || connectionError("visits")}</ErrorDescription>
                     </ErrorTitleRow>

                     {errorMessage && userData.role === SD_Roles.DOCTOR ? (
                         <BackButton style={{ backgroundColor: "#002147" }}
                             onClick={() => navigate("/visit/insert")}>Insert a visit </BackButton>
                     ) : (
                         <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                     )}
                    </ErrorMessage>
                </>
            );   
    }

    else {
        content = data.map((visit: Visit) => {
            const patient = patientsData?.find((patient: Patient) => patient.id === visit.patientId);
            const doctor = doctorsData?.find((doctor: Doctor) => doctor.id === visit.doctorId);

            return (
                <tbody key={visit.id}>
                    <TableRow >
                        <TableCell>{doctor.name} {" "} {doctor.lastName}</TableCell>
                        <TableCell>{patient.name} {" "} {patient.lastName}</TableCell>
                        <TableCell>{visit.complaints}</TableCell>
                        <TableCell>{visit.diagnosis}</TableCell>

                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/visit/" + visit.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        {userData.role === SD_Roles.DOCTOR &&
                            <>
                                <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/visit/update/" + visit.id)} >
                                    <FontAwesomeIcon icon={faEdit} />
                                </ActionButton>
                                <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleVisitDelete(visit.id)}>
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
                        <TableHeader>Visits List</TableHeader>

                        {userData.role == SD_Roles.DOCTOR &&
                        <AddButton onClick={() => navigate("/visit/insert")}  >
                            <FontAwesomeIcon icon={faAdd} />
                            </AddButton>
                        }
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell>Doctor</TableHeaderCell>
                                <TableHeaderCell>Patient</TableHeaderCell>
                                <TableHeaderCell>Complaints</TableHeaderCell>
                                <TableHeaderCell>Diagnosis </TableHeaderCell>
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

export default withAuthorization(VisitList , [SD_Roles.DOCTOR, SD_Roles.ADMINISTRATOR]);