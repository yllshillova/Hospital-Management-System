/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { Header, SidePanel } from "../../app/layout";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Title } from "../../app/common/styledComponents/upsert";
import Patient from "../../app/models/Patient";
import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import { useGetEmergencyContactsByPatientIdQuery } from "../../app/APIs/emergencyContactApi";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function EmergencyContactDetails() {

    const { id } = useParams<string>();
    const { data, isLoading, error, isError } = useGetEmergencyContactsByPatientIdQuery(id);
    const { data: patientsData, isLoading: patientsLoading, error: patientsError, isError: patientsIsError } = useGetPatientsQuery(null);
    const navigate = useNavigate();
    const location = useLocation();

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }
    const fbError = error as FetchBaseQueryError;

    if (isError || patientsIsError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }
    if (isLoading || patientsLoading ) return <MainLoader />;

    if (data) {
        const patient = patientsData?.find((patient: Patient) => patient.id === data.patientId);
       

        return (
            <>
                <Header />
                <SidePanel />

                <OuterContainer>
                    <Container>
                        <FormContainer >
                            {isLoading && <MainLoader />}
                            <Title>
                                EmergencyContact for {patient.name} {patient.lastName}
                            </Title>
                            <Form>
                                <FormGroup>
                                    <Label>Contact Name</Label>
                                    <Input
                                        type="text"
                                        value={data.contactName}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Relation</Label>
                                    <Input
                                        type="text"
                                        value={data.relation}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>PhoneNumber</Label>
                                    <Input
                                        type="Notes"
                                        value={data.phoneNumber}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Patient</Label>
                                    <Input
                                        type="text"
                                        value={`${patient.name} ${patient.lastName}`}
                                    />
                                    {patientsError && <div style={{ color: 'red' }}>Error loading patient</div>}
                                </FormGroup>

                                <ButtonsContainer>
                                    <BackToProductsButton onClick={() => navigate("/")}>
                                        Back to Appointments
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

export default EmergencyContactDetails;
