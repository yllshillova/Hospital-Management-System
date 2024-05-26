/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetDepartmentByIdQuery } from "../../app/APIs/departmentApi";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { Header, SidePanel } from "../../app/layout";
import { Attribute, Label, LeftContainer, MainContainer, SectionTitle, Value, WrapperContainer } from "../../app/common/styledComponents/details";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function DepartmentDetails() {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetDepartmentByIdQuery(id);
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
        const department = data;
        return (
            <>
                <Header />
                <SidePanel />
                <MainContainer>
                    <WrapperContainer>
                        <LeftContainer>
                            <SectionTitle>Details of : {department.name}</SectionTitle>
                            <Attribute>
                                <label style={{ fontWeight: "bold", color: "#009F6B" }}>{department.isDeleted === "True" ? "Passive" : "Active"} </label>
                            </Attribute>
                            <Attribute>
                                <Label>Name</Label>
                                <Value>{department.name}</Value>
                            </Attribute>
                        </LeftContainer>
                    </WrapperContainer>

                    {/*<AdditionalInfoContainer>*/}
                    {/*    <SectionTitle>Additional Information</SectionTitle>*/}
                    {/*    <LabelsRow>*/}
                    {/*        <Label>Created At</Label>*/}
                    {/*        <Label></Label>*/}
                    {/*        <Label></Label>*/}
                    {/*        <Label>Updated At</Label>*/}
                    {/*    </LabelsRow>*/}
                    {/*    <ValuesRow>*/}
                    {/*        <Value>{formatDate(doctor.createdAt)}</Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value>{formatDate(doctor.updatedAt)}</Value>*/}
                    {/*    </ValuesRow>*/}
                    {/*</AdditionalInfoContainer>*/}
                </MainContainer>
            </>
        );
    }
    return null;
}

export default withAuthorization(DepartmentDetails, [SD_Roles.ADMINISTRATOR]);

