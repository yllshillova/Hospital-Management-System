/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, Container, Form, FormGroup, Input, Label, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { useCreateAppointmentMutation, useUpdateAppointmentMutation } from '../../app/APIs/appointmentApi';
import { Header, SidePanel } from '../../app/layout';
import Doctor from '../../app/models/Doctor';
import Patient from '../../app/models/Patient';
import { useGetPatientsQuery } from '../../app/APIs/patientApi';
import { useGetDoctorsQuery } from '../../app/APIs/doctorApi';
import { formatDateGeneral } from '../../app/utility/formatDate';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1); 
// Define the validation schema using Joi
const appointmentSchema = Joi.object({
    checkInDate: Joi.date()
        .min(today)
        .required()
        .messages({
            'date.min': `Check-In Date cannot be before today's date.`,
            'any.required': 'Check-In Date is a required field.'
        }),
    checkOutDate: Joi.date()
        .min(Joi.ref('checkInDate'))
        .greater(Joi.ref('checkInDate')) // Ensures checkOutDate is at least one day after checkInDate
        .required()
        .messages({
            'date.min': 'Check-Out Date must be later than the Check-In Date.',
            'date.greater': 'Check-Out Date must be at least one day after the Check-In Date.',
            'any.required': 'Check-Out Date is a required field.'
        }),
    status: Joi.string()
        .required()
        .min(5)
        .messages({
            'string.empty': 'Status is required.',
            'any.required': 'Status is a required field.',
                    'string.min': 'Status must be at least 5 characters long.',

        }),
    reason: Joi.string()
        .required()
        .min(5)
        .messages({
            'string.empty': 'Reason is required.',
            'any.required': 'Reason is a required field.',
                                'string.min': 'Reason must be at least 5 characters long.',

        }),
    notes: Joi.string()
        .allow('')
        .min(5)
        .optional(), // Making it optional explicitly
    patientId: Joi.string()
        .required()
        .messages({
            'string.empty': 'Patient selection is required.',
            'any.required': 'Patient is a required field.',
            'string.min': 'Patient must be at least 5 characters long.',

        }),
    doctorId: Joi.string()
        .required()
        .messages({
            'string.empty': 'Doctor selection is required.',
            'any.required': 'Doctor is a required field.'
        })
});


interface AppointmentData {
    checkInDate: string;
    checkOutDate: string;
    status: string;
    reason: string;
    notes: string;
    patientId: string;
    doctorId: string;
}
interface AppointmentFormProps {
    id?: string;
    data?: AppointmentData;
}


function AppointmentForm({ id, data }: AppointmentFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: joiResolver(appointmentSchema),
        defaultValues: {
            checkInDate: formatDateGeneral(data?.checkInDate),
            checkOutDate: formatDateGeneral(data?.checkOutDate),
            status: data?.status || '',
            reason: data?.reason || '',
            notes: data?.notes || '',
            patientId: data?.patientId || '',
            doctorId: data?.doctorId || ''
        }

    });

    const [createAppointment] = useCreateAppointmentMutation();
    const [updateAppointment] = useUpdateAppointmentMutation();
    const navigate = useNavigate();

      const { data: patientsData, isLoading:patientLoading } = useGetPatientsQuery(null);
    const { data: doctorsData , isLoading: doctorLoading } = useGetDoctorsQuery(null);
    function isErrorWithMessage(error: any): error is { data: string } {
        return error && typeof error.data === 'string';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data : any) => {
        try {
            let response;
            if (id) {
                response = await updateAppointment({ id, data });
            } else {
                // Create appointment
                response = await createAppointment(data);
            }
            
            if ('error' in response && response.error) {
                if (isErrorWithMessage(response.error)) {
                    toastNotify(response.error.data, "error");
                } else {
                    toastNotify("An unknown error occurred.", "error");
                }
            } else {
                toastNotify("Appointment processed successfully", "success");
                navigate('/appointments');
            }
            
        } catch (error) {
            toastNotify("An error occurred while processing the appointment.", "error");
        } finally {
            reset(); // Optionally reset form fields
        }
    };

    return (
        <div>
            <Header />
            <SidePanel />
            <Container>
                <Form style={{padding:'20px'}} onSubmit={handleSubmit(onSubmit)}>
                    {isSubmitting && <MainLoader />}
                    <Title>{id ? "Edit Appointment" : "Add Appointment"}</Title>
                    <FormGroup>
                        <Label>Check-In Date:</Label>
                        <Input type="date" {...register('checkInDate')} />
                        {/* Check and render error message */}
                        {errors.checkInDate && typeof errors.checkInDate.message === 'string' && (
                            <p style={{ color: 'red', fontSize: '12px' }}>
                                {errors.checkInDate.message}</p>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label>Check-Out Date:</Label>
                        <Input type="date" {...register('checkOutDate')} />
                        {/* Check and render error message */}
                        {errors.checkOutDate && typeof errors.checkOutDate.message === 'string' && (
                            <p style={{ color: 'red', fontSize: '12px' }}>
                                {errors.checkOutDate.message}</p>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label>Status:</Label>
                        <Input type="text" {...register('status')} />
                        {/* Check and render error message */}
                        {errors.status && typeof errors.status.message === 'string' && (
                            <p style={{ color: 'red', fontSize:'12px' }}>
{errors.status.message}</p>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label>Reason:</Label>
                        <Input type="text" {...register('reason')} />
                        {/* Check and render error message */}
                        {errors.reason && typeof errors.reason.message === 'string' && (
                            <p style={{ color: 'red', fontSize: '12px' }}>
{errors.reason.message}</p>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label>Notes:</Label>
                        <Input type="text" {...register('notes')} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Patient:</Label>
                        <Select {...register('patientId')} disabled={patientLoading}>
                            <option value="">Select Patient</option>
                            {patientsData?.map((patient: Patient) => (
                                <option key={patient.id} value={patient.id}>{patient.name}</option>
                            ))}
                        </Select>
                        {errors.patientId && <p style={{ color: 'red' }}>{errors.patientId.message}</p>}
                    </FormGroup>
                    <FormGroup>
                        <Label>Doctor:</Label>
                        <Select {...register('doctorId')} disabled={doctorLoading}>
                            <option value="">Select Doctor</option>
                            {doctorsData?.map((doctor: Doctor) => (
                                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                            ))}
                        </Select>
                        {errors.doctorId && <p style={{ color: 'red' }}>{errors.doctorId.message}</p>}
                    </FormGroup>
                    <div style={{ display: 'flex', gap: '5px', justifyContent:'center' }}>
           
                        <SubmitButton  type="submit">Submit</SubmitButton>
                    <BackToProductsButton onClick={() => navigate("/appointments")}>
                        Back to appointments
                        </BackToProductsButton>
                    </div>
                </Form>
               
            </Container>
        </div>
    );
}

export default AppointmentForm;
