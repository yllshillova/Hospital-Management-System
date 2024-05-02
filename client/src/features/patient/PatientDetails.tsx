/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetPatientByIdQuery } from "../../app/APIs/patientApi";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { Header, SidePanel } from "../../app/layout";
import { Attribute, Label, LabelsRow, LeftContainer, MainContainer, RightContainer, SectionTitle, Value, ValuesRow, WrapperContainer } from "../../app/common/styledComponents/details";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function PatientDetails() {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetPatientByIdQuery(id);
    const navigate = useNavigate();
    const location = useLocation();

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        const patient = data;
        const statusLabel = patient.isDeleted === "True" ?
            <label style={{ fontWeight: "bold", color: "#DC143C" }}>Passive </label> :
            <label style={{ fontWeight: "bold", color: "#009F6B" }}>Active </label>;
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
                   <Value style={{color:"crimson", fontWeight:"bold"} }>{patient.bloodGroup}</Value>
                   <Value>{patient.allergies}</Value>
                   </ValuesRow>
                </RightContainer>
        </WrapperContainer>

        {/*<AdditionalInfoContainer>*/}
        {/*    <SectionTitle>Additional Information</SectionTitle>*/}
        {/*    <LabelsRow>*/}
        {/*        <Label>Blood Group</Label>*/}
        {/*        <Label></Label>*/}
        {/*        <Label></Label>*/}
        {/*        <Label>Allergies</Label>*/}
        {/*    </LabelsRow>*/}
        {/*    <ValuesRow>*/}
        {/*        <Value style={{color:"crimson", fontWeight:"bold"} }>{patient.bloodGroup}</Value>*/}
        {/*        <Value>{patient.allergies}</Value>*/}
        {/*    </ValuesRow>*/}
        {/*</AdditionalInfoContainer>*/}
    </MainContainer>
</>
        );
    }
    return null;
}

export default PatientDetails;
