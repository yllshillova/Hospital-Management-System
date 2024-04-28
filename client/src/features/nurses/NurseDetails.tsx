/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useGetNurseByIdQuery } from "../../app/APIs/nurseApi";
import { Header, SidePanel } from "../../app/layout";
import { formatDate } from "../../app/utility/formatDate";
import { useGetDepartmentByIdQuery } from "../../app/APIs/departmentApi";
import MiniLoader from "../../app/common/MiniLoader";
import { Attribute, Label, LabelsRow, LeftContainer, MainContainer, RightContainer, SectionTitle, Value, ValuesRow, WrapperContainer } from "../../app/common/styledComponents/details";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function NurseDetails() {
    const { id } = useParams<string>();
    const { data: nurse, isLoading, error, isError } = useGetNurseByIdQuery(id);
    const { data: departmentData, isLoading: departmentLoader, error: departmentError }
        = useGetDepartmentByIdQuery(nurse?.departmentId || "");
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




    if (nurse && nurse.departmentId) {
        const statusLabel = nurse.isDeleted === "True" ?
            <label style={{ fontWeight: "bold", color: "#DC143C" }}>Passive </label> :
            <label style={{ fontWeight: "bold", color: "#009F6B" }}>Active </label>;
        return (
            <>
                <Header />
                <SidePanel />

                <MainContainer>
                    <WrapperContainer>

                        <LeftContainer>
                            <SectionTitle>Details of : {nurse.name}</SectionTitle>
                            <Attribute>
                                {statusLabel}
                            </Attribute>
                            <Attribute>
                                <Label>Name</Label>
                                <Value>{nurse.name}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Last Name</Label>
                                <Value>{nurse.lastName}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Residence</Label>
                                <Value>{nurse.residence}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Department</Label>
                                <Value> {departmentLoader ? (
                                    <MiniLoader />
                                ) : departmentData ? (
                                    departmentData.name
                                ) : departmentError ? (
                                    departmentError.data
                                ) : (
                                    "Department not found!"
                                )}</Value>
                            </Attribute>
                        </LeftContainer>


                        <RightContainer>
                            <SectionTitle>Personal Information</SectionTitle>
                            <LabelsRow>
                                <Label>Address</Label>
                                <Label>Email</Label>
                            </LabelsRow>
                            <ValuesRow>
                                <Value>{nurse.address}</Value>
                                <Value>{nurse.email}</Value>
                            </ValuesRow>

                            <LabelsRow>
                                <Label>Gender</Label>
                                <Label>Birthday</Label>
                            </LabelsRow>
                            <ValuesRow>
                                <Value>{nurse.gender}</Value>
                                <Value>{formatDate(nurse.birthday)}</Value>
                            </ValuesRow>
                            <LabelsRow>
                                {/*<Label>Allergies</Label>*/}
                                <Label>Created At</Label>
                                <Label>Updated At</Label>
                            </LabelsRow>
                            <ValuesRow>
                                {/*<Value>Lactose , Paracetamol Lactose</Value>*/}
                                <Value>{formatDate(nurse.createdAt)}</Value>
                                <Value>{formatDate(nurse.updatedAt)}</Value>
                            </ValuesRow>

                        </RightContainer>
                    </WrapperContainer>

                </MainContainer>
            </>
        );


    }
    return null;
}

export default NurseDetails;
