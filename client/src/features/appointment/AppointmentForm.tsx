/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { useCreateAppointmentMutation, useUpdateAppointmentMutation } from "../../app/APIs/appointmentApi";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { useGetPatientsQuery } from '../../app/APIs/patientApi';
import { useGetDoctorsQuery } from '../../app/APIs/doctorApi';
import Patient from '../../app/models/Patient';
import Doctor from '../../app/models/Doctor';
import { validCheckInOutDate } from '../../app/utility/validCheckInOutDate';
import Appointment from '../../app/models/Appointment';
import inputHelper from '../../app/helpers/inputHelper';

interface AppointmentFormProps {
    id?: string;
    data?: Appointment;
}

const appointmentData: Appointment = {
    checkInDate: new Date(),
    checkOutDate: new Date(),
    status: "",
    reason: "",
    notes: "",
    patientId: "",
    doctorId: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    doctor: {} as Doctor,
    patient: {} as Patient
};

function AppointmentForm({ id, data }: AppointmentFormProps) {
    const [appointmentInputs, setAppointmentInputs] = useState<Appointment>(data || appointmentData);
    const [createAppointment] = useCreateAppointmentMutation();
    const [updateAppointment] = useUpdateAppointmentMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const { data: patientsData, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null);
    const { data: doctorsData, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(null);

    const handleAppointmentInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, appointmentInputs);
        setAppointmentInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("CheckInDate", new Date(appointmentInputs.checkInDate!).toLocaleString());
        formData.append("CheckOutDate", new Date(appointmentInputs.checkOutDate!).toLocaleString());
        formData.append("Status", appointmentInputs.status);
        formData.append("Reason", appointmentInputs.reason);
        formData.append("Notes", appointmentInputs.notes);
        formData.append("PatientId", appointmentInputs.patientId);
        formData.append("DoctorId", appointmentInputs.doctorId);

        const currentLocation = window.location.pathname;
        if (id) {
            formData.append("Id", id);

            const response = await updateAppointment({ data: formData, id });

            if (response.error) {
                console.log(response.error);
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Appointment has been  updated ", "success");
                navigate('/Appointment');
            }
        } else {
            const response = await createAppointment(formData);
            console.log(response);

            if (response.error) {
                console.log(response.error);
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Appointment has been created ", "success");
                navigate('/appointments');
            }

        }
        setLoading(false);
    };

    return (
        <>
            <Header />
            <SidePanel />
            <OuterContainer>
                <Container>
                    <FormContainer >
                        {loading && <MainLoader />}
                        <Title>
                            {id ? "Edit Appointment" : "Add Appointment"}
                        </Title>

                        {/* Display error messages */}
                        {errorMessages.length > 0 && (
                            <div style={{ color: 'red' }}>
                                <ul>
                                    {errorMessages.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Form
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        ><FormGroup>
                                <Select
                                    name="doctorId"
                                    value={appointmentInputs.doctorId}
                                    onChange={handleAppointmentInput}
                                    disabled={doctorsLoading}
                                >
                                    <option value="">Select Doctor</option>
                                    {doctorsData && doctorsData.map((doctor: Doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name} {" "} {doctor.lastName}
                                        </option>
                                    ))}
                                </Select>
                                {doctorsError && <div style={{ color: 'red' }}>Error loading doctors</div>}
                            </FormGroup>

                            <FormGroup>
                                <Select
                                    name="patientId"
                                    value={appointmentInputs.patientId}
                                    onChange={handleAppointmentInput}
                                    disabled={patientsLoading}
                                >
                                    <option value="">Select Patient</option>
                                    {patientsData && patientsData.map((patient: Patient) => (
                                        <option key={patient.id} value={patient.id}>
                                            {patient.name} {" "} {patient.lastName}
                                        </option>
                                    ))}
                                </Select>
                                {patientsError && <div style={{ color: 'red' }}>Error loading patients</div>}
                            </FormGroup>
                            <FormGroup>
                                <Label>Check In </Label>
                                <Input
                                    type="datetime-local"
                                    name="checkInDate"
                                    value={validCheckInOutDate(appointmentInputs.checkInDate)}
                                    onChange={handleAppointmentInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Check Out </Label>
                                <Input
                                    type="datetime-local"
                                    name="checkOutDate"
                                    value={validCheckInOutDate(appointmentInputs.checkOutDate)}
                                    onChange={handleAppointmentInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Status</Label>
                                <Input
                                    type="text"
                                    name="status"
                                    value={appointmentInputs.status}
                                    onChange={handleAppointmentInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Reason:</Label>
                                <Input
                                    type="text"
                                    name="reason"
                                    value={appointmentInputs.reason}
                                    onChange={handleAppointmentInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Notes:</Label>
                                <Input
                                    type="text"
                                    name="notes"
                                    value={appointmentInputs.notes}
                                    onChange={handleAppointmentInput}
                                />
                            </FormGroup>
                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/appointments")}>
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
export default AppointmentForm;
