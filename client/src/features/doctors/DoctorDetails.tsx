/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useGetDoctorByIdQuery } from "../../app/APIs/doctorApi";
import { Header, SidePanel } from "../../app/layout";
import { formatDate } from "../../app/utility/formatDate";
import { useGetDepartmentByIdQuery } from "../../app/APIs/departmentApi";
import MiniLoader from "../../app/common/MiniLoader";
import { Attribute, Label, LabelsRow, LeftContainer, MainContainer, RightContainer, SectionTitle, Value, ValuesRow, WrapperContainer } from "../../app/common/styledComponents/details";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function DoctorDetails() {
    const { id } = useParams<string>();
    const { data: doctor, isLoading, error, isError } = useGetDoctorByIdQuery(id);
    const { data: departmentData, isLoading: departmentLoader, error: departmentError }
        = useGetDepartmentByIdQuery(doctor?.departmentId|| "");
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




    if (doctor && doctor.departmentId) {
        return (
            <>
                <Header />
                <SidePanel />

                <MainContainer>
                    <WrapperContainer>

                        <LeftContainer>
                            <SectionTitle>Details of : {doctor.name}</SectionTitle>
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



                        {/*<>*/}
                        {/*    <div>*/}
                        {/*        <h2>Doctor Details</h2>*/}
                        {/*        <p>Id: {doctor.id}</p>*/}
                        {/*        <p>Name: {doctor.name}</p>*/}
                        {/*        <p>Last Name: {doctor.lastName}</p>*/}
                        {/*        <p>Specialization: {doctor.specialization}</p>*/}
                        {/*        <p>Residence: {doctor.residence}</p>*/}
                        {/*        <p>Address: {doctor.address}</p>*/}
                        {/*        <p>Gender: {doctor.gender}</p>*/}
                        {/*        <p>Birthday: {new Date(doctor.birthday).toLocaleDateString()}</p>*/}
                        {/*        <p>DepartmentId: {doctor.departmentId}</p>*/}
                        {/*        <p>Created At: {new Date(doctor.createdAt).toLocaleDateString()}</p>*/}
                        {/*        <p>Updated At: {new Date(doctor.updatedAt).toLocaleDateString()}</p>*/}
                        {/*        <p>IsDeleted: {doctor.isDeleted}</p>*/}
                        {/*    </div>*/}
                        {/*</>*/}

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
    return null;
}

export default withAuthorization(DoctorDetails, [SD_Roles.DOCTOR, SD_Roles.ADMINISTRATOR]);
