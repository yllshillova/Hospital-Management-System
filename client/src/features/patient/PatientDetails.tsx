/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetPatientByIdQuery } from "../../app/APIs/patientApi";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import styled from 'styled-components';
import { Header, SidePanel } from "../../app/layout";

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
                    <Label>Phone Number</Label>
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
                </RightContainer>
        </WrapperContainer>

        <AdditionalInfoContainer>
            <SectionTitle>Additional Information</SectionTitle>
            <LabelsRow>
                <Label>Blood Group</Label>
                <Label></Label>
                <Label></Label>
                <Label>Allergies</Label>
            </LabelsRow>
            <ValuesRow>
                <Value style={{color:"crimson", fontWeight:"bold"} }>{patient.bloodGroup}</Value>
                <Value>{patient.allergies}</Value>
            </ValuesRow>
        </AdditionalInfoContainer>
    </MainContainer>
</>
        );
    }
    return null;
}
const MainContainer = styled.div`
    margin-left: 200px;
    padding: 20px;
    margin-top: 45px;
`;
const WrapperContainer = styled.div`
    display: flex;
    gap: 20px;
`;
const LeftContainer = styled.div`
    flex: 1;
    background-color: white;
    border: 1px solid #A9A9A9;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const RightContainer = styled.div`
    flex: 2;
    background-color: white;
    border: 1px solid #A9A9A9;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
`;
const AdditionalInfoContainer = styled.div`
    margin-top: 16px;
    background-color: white;
    padding: 20px;
    border: 1px solid #A9A9A9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const SectionTitle = styled.h2`
    font-size: 1.2rem;
    color: #1a252e; 
    margin-bottom: 20px;
`;
const LabelsRow = styled.div`
    display: flex;
    gap: 100px;
    margin-bottom: 10px;
`;
const ValuesRow = styled.div`
    display: flex;
    gap: 130px;
    font-weight:bold;
    margin-bottom: 15px;
`;
const Attribute = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;
const Label = styled.span`
    color: #696969	; 
    margin-right: 10px; 
    width: 120px;
    margin-bottom: 5px;
`;
const Value = styled.span`
    color: #000;
    font-weight:bold;
    margin-bottom: 5px;
`;
export default PatientDetails;
