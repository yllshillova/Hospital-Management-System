/* eslint-disable react-hooks/rules-of-hooks */
import {useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Header, SidePanel } from "../../app/layout";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer,Title } from "../../app/common/styledComponents/upsert";
import { useGetVisitByIdQuery } from "../../app/APIs/visitApi";
import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import { useGetDoctorsQuery } from "../../app/APIs/doctorApi";
import Doctor from "../../app/models/Doctor";
import Patient from "../../app/models/Patient";
import { SD_Roles } from "../../app/utility/SD";
import withAuthorization from "../../app/hoc/withAuthorization";
import { BackButton, ErrorDescription, ErrorIcon, ErrorMessage, ErrorTitleRow } from "../../app/common/styledComponents/table";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import { connectionError } from "../../app/utility/connectionError";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function VisitDetails() {
    const { id } = useParams<string>();
    const { data, isLoading, error } = useGetVisitByIdQuery(id);
    const { data: doctorsData, isLoading: doctorsLoading, error: doctorsError  } = useGetDoctorsQuery(null);
    const { data: patientsData, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null); 
    const navigate = useNavigate();


    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }

    

    if (isLoading || patientsLoading || doctorsLoading) {
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

    else if (error || doctorsError || patientsError) {

        const fetchError = (error as FetchBaseQueryError) ||
            (doctorsError as FetchBaseQueryError) ||
            (patientsError as FetchBaseQueryError);

        const errorMessage = fetchError?.data as string;

        return (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{connectionError("appointment") || errorMessage}</ErrorDescription>
                    </ErrorTitleRow>
                    <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                </ErrorMessage>
            </>
        );
    }

    if (data) {
        const patient = patientsData?.find((patient: Patient) => patient.id === data.patientId);
        const doctor = doctorsData?.find((doctor: Doctor) => doctor.id === data.doctorId);
        return (
            <>
                <Header />
                <SidePanel />

                <OuterContainer>
                    <Container>
                        <FormContainer >
                            {isLoading && <MainLoader />}
                            <Title>
                                Visit Details for {`${patient.name} ${patient.lastName}`}
                            </Title>

                            <Form>
                                <FormGroup>
                                    <Label>Doctor</Label>
                                    <Input
                                        type="text"
                                        value={`${doctor.name} ${doctor.lastName}`}
                                    />
                                    {doctorsError && <div style={{ color: 'red' }}>Error loading doctors</div>}
                                </FormGroup>

                                <FormGroup>
                                    <Label>Patient</Label>
                                    <Input
                                        type="text"
                                        value={`${patient.name} ${patient.lastName}`}
                                    />
                                   {patientsError && <div style={{ color: 'red' }}>Error loading patients</div>}
                                </FormGroup>
                                <FormGroup>
                                    <Label>Complaints</Label>
                                    <Input
                                        type="text"
                                        value={data.complaints}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Diagnosis</Label>
                                    <Input
                                        type="text"
                                        value={data.diagnosis}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Examinations</Label>
                                    <Input
                                        type="text"
                                        value={data.examinations}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Required Analysis</Label>
                                    <Input
                                        type="text"
                                        value={data.requiredAnalysis}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Therapy</Label>
                                    <Input
                                        type="text"
                                        value={data.therapy}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Advice</Label>
                                    <Input
                                        type="text"
                                        value={data.advice}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Remarks</Label>
                                    <Input
                                        type="text"
                                        value={data.remarks}
                                    />
                                </FormGroup>

                                <ButtonsContainer>
                                    <BackToProductsButton onClick={() => navigate("/visits")}>
                                        Back to Visits
                                    </BackToProductsButton>
                                </ButtonsContainer>
                            </Form>
                        </FormContainer>
                    </Container>
                </OuterContainer>
            </>
        );


    }
    return null;
}

export default withAuthorization(VisitDetails, [SD_Roles.DOCTOR, SD_Roles.ADMINISTRATOR]);