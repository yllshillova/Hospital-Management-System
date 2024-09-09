/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useGetDoctorByIdQuery } from "../../app/APIs/doctorApi";
import { Header, SidePanel } from "../../app/layout";
import { formatDate } from "../../app/utility/formatDate";
import { useGetDepartmentByIdQuery } from "../../app/APIs/departmentApi";
import MiniLoader from "../../app/common/MiniLoader";
import { Attribute, Label, LabelsRow, LeftContainer, MainContainer, RightContainer, SectionTitle, Value, ValuesRow, WrapperContainer } from "../../app/common/styledComponents/details";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import { BackButton, ErrorDescription, ErrorIcon, ErrorMessage, ErrorTitleRow } from "../../app/common/styledComponents/table";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function DoctorDetails() {
    const { id } = useParams<string>();
    const { data: doctor, isLoading, error} = useGetDoctorByIdQuery(id);
    const { data: departmentData, isLoading: departmentLoader, error: departmentError }
        = useGetDepartmentByIdQuery(doctor?.departmentId|| "");
    const navigate = useNavigate();


    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }

    if (isLoading || departmentLoader) {
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

    else if (error || departmentError) {

        const fetchError = (error as FetchBaseQueryError) ||
            (departmentError as FetchBaseQueryError);

        const errorMessage = fetchError?.data as string;

        return (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{connectionError("doctor") || errorMessage}</ErrorDescription>
                    </ErrorTitleRow>
                    <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                </ErrorMessage>
            </>
        );
    }

    else {
        return (
            <>
                <Header />
                <SidePanel />

                <MainContainer>
                    <WrapperContainer>

                        <LeftContainer>
                            <SectionTitle>Details of : {doctor.name} {" "} {doctor.lastName}</SectionTitle>
                            <Attribute>
                                <label style={{ fontWeight: "bold", color: "#009F6B" }}>{doctor.isDeleted === "True" ? "Passive" : "Active"} </label>
                            </Attribute>
                            <Attribute>
                                <Label>Name</Label>
                                <Value>{doctor.name}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Last Name</Label>
                                <Value>{doctor.lastName}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Specialization</Label>
                                <Value>{doctor.specialization}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Residence</Label>
                                <Value>{doctor.residence}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Department</Label>
                                <Value>
                                    {departmentLoader ? (<MiniLoader />) : departmentData ? (departmentData.name) :
                                        ("Department not found!")}
                                </Value>
                            </Attribute>
                        </LeftContainer>


                        <RightContainer>
                            <SectionTitle>Personal Information</SectionTitle>
                            <LabelsRow>
                                <Label>Address</Label>
                                <Label>Email</Label>
                            </LabelsRow>
                            <ValuesRow>
                                <Value>{doctor.address}</Value>
                                <Value>{doctor.email}</Value>
                            </ValuesRow>

                            <LabelsRow>
                                <Label>Gender</Label>
                                <Label>Birthday</Label>
                            </LabelsRow>
                            <ValuesRow>
                                <Value>{doctor.gender}</Value>
                                <Value>{formatDate(doctor.birthday)}</Value>
                            </ValuesRow>
                        </RightContainer>
                    </WrapperContainer>

                    
                </MainContainer>
            </>
        );
    }
}

export default withAuthorization(DoctorDetails, [SD_Roles.DOCTOR, SD_Roles.ADMINISTRATOR, SD_Roles.NURSE]);
