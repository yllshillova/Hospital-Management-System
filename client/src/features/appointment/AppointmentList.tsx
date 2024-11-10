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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/storage/redux/store";
import { useGetDoctorsQuery } from "../../app/APIs/doctorApi";
import User from "../../app/models/User";
import { connectionError } from "../../app/utility/connectionError";
import styled from "styled-components";
import { useState } from "react";
import Patient from "../../app/models/Patient";
import Doctor from "../../app/models/Doctor";
import { setSearchTerm } from "../../app/storage/redux/searchSlice";
import inputHelper from "../../app/helpers/inputHelper";
//import { SearchContainer, SearchInput } from "../../app/common/styledComponents/chat";
import jsPDF from "jspdf";


function AppointmentList() {

    const { data: appointmentData, isLoading: isAppointmentLoading, error: appointmentError } = useGetAppointmentsQuery(null);
    
    const { data: patientData, isLoading: isPatientLoading, error: patientError } = useGetPatientsQuery(null);
    const { data: doctorData, isLoading: isDoctorLoading, error: doctorError } = useGetDoctorsQuery(null);
    const [deleteAppointment] = useDeleteAppointmentMutation();

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const userData: User = useSelector((state: RootState) => state.auth);
    const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        status: ""
    });

    const handleFiltersChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const updatedFilters = inputHelper(e, filters);
        setFilters(updatedFilters);
    };

    // Update searchTerm in Redux when the input changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const filteredAppointments = appointmentData?.filter((appointment: Appointment) => {
        const { doctorName, patientName, patientPersonalNumber } = getFullNameAndNumber(appointment, doctorData, patientData);

        const appointmentDate = new Date(appointment.checkInDate);
        const isWithinDateRange = (!filters.startDate || appointmentDate >= new Date(filters.startDate)) &&
            (!filters.endDate || appointmentDate <= new Date(filters.endDate));
        const matchesStatus = !filters.status || appointment.status === filters.status;
        const matchesSearchTerm = searchTerm === '' ||
            `${doctorName} ${patientName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patientPersonalNumber.toLowerCase().includes(searchTerm.toLowerCase());

        return isWithinDateRange && matchesStatus && matchesSearchTerm;
    });

    const generatePdfReport = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 10;
        const columnWidths = [40, 50, 60, 40]; // Adjusted column widths for a balanced layout

        // Add Montserrat Font

        // Add Header with Main Title
        doc.setFont("Montserrat", "bold");
        doc.setFontSize(22);
        doc.setTextColor("#002147");
        doc.text("Hospital Management System", pageWidth / 2, 20, { align: "center" });

        // Add Report Title and Generated Time
        doc.setFontSize(16);
        doc.text("Appointments Report", pageWidth / 2, 30, { align: "center" });

        const generatedTime = new Date().toLocaleString();
        doc.setFontSize(10);
        doc.setFont("Montserrat", "italic");
        doc.setTextColor(100);
        doc.text(`Generated on: ${generatedTime}`, margin, 40);

        // Add Table Header with Background Color
        const headerY = 50;
        doc.setFont("Montserrat", "bold");
        doc.setFontSize(12);
        doc.setTextColor(255); // White text color for contrast
        doc.setFillColor("#002147"); // Custom blue color for table header
        doc.rect(margin, headerY - 7, pageWidth - margin * 2, 12, "F");
        doc.text("Doctor", margin + 4, headerY);
        doc.text("Patient", margin + columnWidths[0] + 4, headerY);
        doc.text("Check-In Date & Time", margin + columnWidths[0] + columnWidths[1] + 4, headerY);
        doc.text("Status", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + 4, headerY);

        // Draw a line below the headers for separation
        doc.setDrawColor("#002147");
        doc.line(margin, headerY + 2, pageWidth - margin, headerY + 2);

        // Add Table Data with Alternating Row Color
        let yPos = headerY + 10; // Starting position for rows
        doc.setFontSize(10);
        doc.setFont("Montserrat", "normal");

        filteredAppointments.forEach((appointment: Appointment, index: number) => {
            const { doctorName, patientName } = getFullNameAndNumber(appointment, doctorData, patientData);
            const checkInDateTime = new Date(appointment.checkInDate).toLocaleString(); // Format date and time

            // Alternating row color for enhanced readability
            if (index % 2 === 0) {
                doc.setFillColor(240, 240, 240); // Very light gray for alternating rows
                doc.rect(margin, yPos - 5, pageWidth - margin * 2, 10, "F");
            }

            // Add data to each column
            doc.setTextColor(0); // Black text color
            doc.text(doctorName, margin + 4, yPos);
            doc.text(patientName, margin + columnWidths[0] + 4, yPos);
            doc.text(checkInDateTime, margin + columnWidths[0] + columnWidths[1] + 4, yPos);
            doc.text(appointment.status, margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + 4, yPos);

            yPos += 10; // Move down for each row

            // Handle page break
            if (yPos > doc.internal.pageSize.getHeight() - 20) {
                // Add new page
                doc.addPage();
                yPos = 20; // Reset y position for new page

                // Re-add Table Header on new page
                doc.setFont("Montserrat", "bold");
                doc.setFontSize(12);
                doc.setTextColor(255);
                doc.setFillColor("#002147"); // Maintain consistent header color
                doc.rect(margin, yPos - 7, pageWidth - margin * 2, 12, "F");
                doc.text("Doctor", margin + 4, yPos);
                doc.text("Patient", margin + columnWidths[0] + 4, yPos);
                doc.text("Check-In Date & Time", margin + columnWidths[0] + columnWidths[1] + 4, yPos);
                doc.text("Status", margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + 4, yPos);
                doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);

                yPos += 10; // Adjust position after header on new page
            }
        });

        // Add Footer with Contact Information
        doc.setFont("Montserrat", "italic");
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Hospital Management System - Contact: info@hospital.com | Phone: (123) 456-7890", pageWidth / 2, doc.internal.pageSize.getHeight() - 5, { align: "center" });

        // Download the PDF
        doc.save("appointments_report.pdf");
    };






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
    }
    else if (appointmentError || patientError || doctorError) {

        const fetchError = (appointmentError as FetchBaseQueryError) || (patientError as FetchBaseQueryError) || (doctorError as FetchBaseQueryError);
        const errorMessage = fetchError?.data as string;

        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("appointments")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage && userData.role === SD_Roles.NURSE ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/appointment/insert")}>Insert an appointment </BackButton>
                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    }
    else {
        content = (
            <>
                <Header />
                <SidePanel />
                <OrdersTable>
                    <FilterContainer>
                        {/* Start Date Filter */}
                        <FilterGroup>
                            <FilterLabel>Start Date</FilterLabel>
                            <FilterInput type="date" name="startDate" onChange={handleFiltersChange} value={filters.startDate} />
                        </FilterGroup>

                        {/* End Date Filter */}
                        <FilterGroup>
                            <FilterLabel>End Date</FilterLabel>
                            <FilterInput type="date" name="endDate" onChange={handleFiltersChange} value={filters.endDate} />
                        </FilterGroup>

                        {/* Search Input */}
                        <SearchContainer>
                            <SearchInput
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search by doctor, patient, or patient ID"
                            />
                        </SearchContainer>

                        {/* Status Dropdown */}
                        <FilterGroup>
                            <FilterLabel>Status</FilterLabel>
                            <FilterSelect name="status" onChange={handleFiltersChange} value={filters.status}>
                                <option value="">All</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                                {/* Add other status options here */}
                            </FilterSelect>
                        </FilterGroup>
                        <ActionButton style={{ backgroundColor: "teal", padding:"4px 10px" }} onClick={generatePdfReport}>
                            Generate PDF Report
                        </ActionButton>

                    </FilterContainer>

                    {filteredAppointments?.length ? (
                        <>
                            <TableNav>
                                <TableHeader>Appointments List</TableHeader>
                                {userData.role === SD_Roles.NURSE && (
                                    <AddButton onClick={() => navigate("/appointment/insert")}>
                                        <FontAwesomeIcon icon={faAdd} />
                                    </AddButton>
                                )}
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
                                <tbody>
                                    {filteredAppointments.map((appointment: Appointment) => {
                                        const { doctorName, patientName } = getFullNameAndNumber(appointment, doctorData, patientData);


                                        return (
                                            <TableRow key={appointment.id}>
                                                <TableCell>{doctorName}</TableCell>
                                                <TableCell>{patientName}</TableCell>
                                                <TableCell>{new Date(appointment.checkInDate!).toLocaleString()}</TableCell>
                                                <TableCell>{new Date(appointment.checkOutDate!).toLocaleString()}</TableCell>

                                                <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/appointment/" + appointment.id)}>
                                                    <FontAwesomeIcon icon={faInfo} />
                                                </ActionButton>

                                                {userData.role === SD_Roles.NURSE && (
                                                    <>
                                                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/appointment/update/" + appointment.id)}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </ActionButton>
                                                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleAppointmentDelete(appointment.id)}>
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </ActionButton>
                                                    </>
                                                )}
                                            </TableRow>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </>
                    ) : (
                            <ErrorMessage>
                                <ErrorTitleRow>
                                    <ErrorIcon icon={faExclamationCircle} />
                                    <ErrorDescription>No appointments found for the selected filters</ErrorDescription>
                                </ErrorTitleRow>
                                
                        </ErrorMessage>
                    )}
                </OrdersTable>
            </>
        );
    }

    return content;
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

//const FilterGroupWrapper = styled.div`
//  display: flex;
//  gap: 4rem; 
//  align-items: center;
//`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
`;

const FilterInput = styled.input`
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 0.5rem; 
`;

const FilterSelect = styled.select`
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 0.5rem; 

  /* Increase the font size for the options */
  option {
    font-size: 14px; /* Bigger font size for options */
    padding: 0.5rem; /* Slight padding to improve readability */
  }
`;


const FilterLabel = styled.label`
  font-weight: bold;
  font-size: 12px;
`;
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0;
`;

const SearchInput = styled.input`
    padding: 0.25rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 12px;
    margin-left: 0.5rem; 
    width: 210px; /* Adjusted width */
    flex-grow: 1; /* Allow the input to grow and take up more space */
`;

export default withAuthorization(AppointmentList, [SD_Roles.ADMINISTRATOR, SD_Roles.NURSE]);

const getFullNameAndNumber = (
    appointment: Appointment,
    doctorData: Doctor[],
    patientData: Patient[]
): { doctorName: string, patientName: string, patientPersonalNumber: string } => {
    const doctor = doctorData?.find((doc: Doctor) => doc.id === appointment.doctorId);
    const patient = patientData?.find((pat: Patient) => pat.id === appointment.patientId);

    const doctorName = doctor ? `${doctor.name} ${doctor.lastName}` : 'Unknown Doctor';
    const patientName = patient ? `${patient.name} ${patient.lastName}` : 'Unknown Patient';
    const patientPersonalNumber = patient ? patient.personalNumber : 'Unknown Personal Number';

    return { doctorName, patientName, patientPersonalNumber };
};

