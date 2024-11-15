/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetPatientByIdQuery } from "../../app/APIs/patientApi";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, ErrorDescription, BackButton } from "../../app/common/styledComponents/table";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { Header, SidePanel } from "../../app/layout";
import { Attribute, ErrorMessage, Label, LabelsRow, LeftContainer, MainContainer, RightContainer, SectionTitle, Value, ValuesRow, WrapperContainer } from "../../app/common/styledComponents/details";
import { useDeleteEmergencyContactMutation, useGetEmergencyContactsByPatientIdQuery} from "../../app/APIs/emergencyContactApi";
import toastNotify from "../../app/helpers/toastNotify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faAdd, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import EmergencyContact from "../../app/models/EmergencyContact";
import { SD_Roles } from "../../app/utility/SD";
import withAuthorization from "../../app/hoc/withAuthorization";
import { connectionError } from "../../app/utility/connectionError";


function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function PatientDetails() {
    const { id } = useParams<{ id: string }>();
    const { data: patientData, isLoading, error } = useGetPatientByIdQuery(id);

    const { data: emergencyData, isLoading: emergencyLoading, error: emergencyError } = useGetEmergencyContactsByPatientIdQuery(id);
    const navigate = useNavigate();
    const location = useLocation();
    let content;

    const handleAddEmergencyContact = () => {
        navigate(`/patient/${id}/emergencyContact/insert`);
    };

    const [deleteEmergencyContact] = useDeleteEmergencyContactMutation();

    const handleEmergencyContactDelete = async (id: string) => {
        const result = await deleteEmergencyContact(id);

        if ('data' in result) {
            toastNotify("EmergencyContact Deleted Successfully", "success");
        }
        else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;
            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }
    };

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }
    

    if (isLoading || emergencyLoading) {
        return (
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
        const errorMessage = (fetchError?.data as string);

        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("patient")}</ErrorDescription>
                    </ErrorTitleRow>
                    <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                </ErrorMessage>
            </>
        );
    }


    else if (patientData) {
        const patient = patientData;
        const statusLabel = patient.isDeleted === "True" ?
            <label style={{ fontWeight: "bold", color: "#DC143C" }}>Passive </label> :
            <label style={{ fontWeight: "bold", color: "#009F6B" }}>Active </label>;

        if (emergencyError) {
            const fetchError = emergencyError as FetchBaseQueryError;
            const errorMessage = (fetchError?.data as string) || connectionError("emergency contacts");
            return (
                <>
                    <Header />
                    <SidePanel />
                    <MainContainer>
                        <WrapperContainer>
                            <LeftContainer>
                                <SectionTitle>Patient Details</SectionTitle>
                                <Attribute>
                                    {statusLabel}
                                </Attribute>
                                <Attribute>
                                    <Label>Name</Label>
                                    <Value>{patient.name}</Value>
                                </Attribute>
                                <Attribute>
                                    <Label>Last Name</Label>
                                    <Value>{patient.lastName}</Value>
                                </Attribute>
                                <Attribute>
                                    <Label>Parent Name</Label>
                                    <Value>{patient.parentName}</Value>
                                </Attribute>
                                <Attribute>
                                    <Label>Residence</Label>
                                    <Value>{patient.residence}</Value>
                                </Attribute>
                                <Attribute>
                                    <Label>Personal Number</Label>
                                    <Value>{patient.personalNumber}</Value>
                                </Attribute>
                            </LeftContainer>

                            <RightContainer>
                                <SectionTitle>Personal Information</SectionTitle>
                                <LabelsRow>
                                    <Label>Address</Label>
                                    <Label>Phone</Label>
                                    <Label>Email</Label>
                                </LabelsRow>
                                <ValuesRow>
                                    <Value>{patient.address}</Value>
                                    <Value>{patient.phoneNumber}</Value>
                                    <Value>{patient.email}</Value>
                                </ValuesRow>

                                <LabelsRow>
                                    <Label>Birthday</Label>
                                    <Label>Occupation</Label>
                                    <Label>Gender</Label>
                                </LabelsRow>
                                <ValuesRow>
                                    <Value>{new Date(patient.birthday).toLocaleDateString()}</Value>
                                    <Value>{patient.occupation}</Value>
                                    <Value>{patient.gender}</Value>
                                </ValuesRow>
                                <LabelsRow>
                                    <Label>Blood Group</Label>
                                    <Label>Allergies</Label>
                                </LabelsRow>
                                <ValuesRow>
                                    <Value style={{ color: "crimson", fontWeight: "bold" }}>{patient.bloodGroup}</Value>
                                    <Value>{patient.allergies}</Value>
                                </ValuesRow>
                            </RightContainer>
                        </WrapperContainer>
                    </MainContainer>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                </>
            );
        }

        if (emergencyLoading) {
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

        else {
            content = emergencyData.map((emergencyContact: EmergencyContact) => {
                return (
                    <tbody key={emergencyContact.id}>
                        <TableRow>
                            <TableCell>{emergencyContact.contactName}</TableCell>
                            <TableCell>{emergencyContact.relation}</TableCell>
                            <TableCell>{emergencyContact.phoneNumber}</TableCell>
                            <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/emergencyContact/update/" + emergencyContact.id)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </ActionButton>
                            <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleEmergencyContactDelete(emergencyContact.id)}>
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

                <MainContainer>
                    <WrapperContainer>
                        <LeftContainer>
                            <SectionTitle>Patient Details</SectionTitle>
                            <Attribute>
                                {statusLabel}
                            </Attribute>
                            <Attribute>
                                <Label>Name</Label>
                                <Value>{patient.name}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Last Name</Label>
                                <Value>{patient.lastName}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Parent Name</Label>
                                <Value>{patient.parentName}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Residence</Label>
                                <Value>{patient.residence}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Personal Number</Label>
                                <Value>{patient.personalNumber}</Value>
                            </Attribute>
                        </LeftContainer>

                        <RightContainer>
                            <SectionTitle>Personal Information</SectionTitle>
                            <LabelsRow>
                                <Label>Address</Label>
                                <Label>Phone</Label>
                                <Label>Email</Label>
                            </LabelsRow>
                            <ValuesRow>
                                <Value>{patient.address}</Value>
                                <Value>{patient.phoneNumber}</Value>
                                <Value>{patient.email}</Value>
                            </ValuesRow>

                            <LabelsRow>
                                <Label>Birthday</Label>
                                <Label>Occupation</Label>
                                <Label>Gender</Label>
                            </LabelsRow>
                            <ValuesRow>
                                <Value>{new Date(patient.birthday).toLocaleDateString()}</Value>
                                <Value>{patient.occupation}</Value>
                                <Value>{patient.gender}</Value>
                            </ValuesRow>
                            <LabelsRow>
                                <Label>Blood Group</Label>
                                <Label>Allergies</Label>
                            </LabelsRow>
                            <ValuesRow>
                                <Value style={{ color: "crimson", fontWeight: "bold" }}>{patient.bloodGroup}</Value>
                                <Value>{patient.allergies}</Value>
                            </ValuesRow>
                        </RightContainer>
                    </WrapperContainer>


                </MainContainer>
                <OrdersTable>
                        <TableNav>
                            <TableHeader>Emergency Contacts </TableHeader>
                        <AddButton onClick={handleAddEmergencyContact}>
                                <FontAwesomeIcon icon={faAdd} />
                            </AddButton>
                        </TableNav>
                        <Table>
                            <thead>
                                <TableHead>
                                    <TableHeaderCell>Name and Surname </TableHeaderCell>
                                    <TableHeaderCell>Relation</TableHeaderCell>
                                    <TableHeaderCell>Phone Number</TableHeaderCell>
                                    <TableHeaderCell>Actions</TableHeaderCell>
                                </TableHead>
                            </thead>
                            {content}
                        </Table>
                    </OrdersTable>
            </>
        );
    }
    return null;
}

export default withAuthorization(PatientDetails, [SD_Roles.NURSE, SD_Roles.ADMINISTRATOR]);
