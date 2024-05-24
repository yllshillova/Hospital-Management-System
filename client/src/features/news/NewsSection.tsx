import { useGetLatestAppointmentsQuery } from "../../app/APIs/appointmentApi";
import { useGetDoctorsQuery } from "../../app/APIs/doctorApi";
import { useGetPatientsQuery } from "../../app/APIs/patientApi";
import { useGetLatestVisitsQuery } from "../../app/APIs/visitApi";
import Patient from "../../app/models/Patient";
import Doctor from "../../app/models/Doctor";
import styled from 'styled-components';

// Styled components
const Container = styled.div`
    max-width: calc(100% - 200px); /* Adjust for the side panel width */
    margin: 0 auto;
    margin-top:55px;
    padding: 10px;
    margin-left: 200px; /* Set the left margin */
    margin-right: 300px; /* Adjust for the chat panel width */
`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: bold;
    margin: 17px 8px;
    `
    ;

const NewsCard = styled.div`
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 8px;
    margin-bottom: 8px;
`;

const NewsTitle = styled.h2`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
`;

const NewsDescription = styled.p`
    font-size: 12px;
    margin: 0;
`;
function NewsSection() {
    const { data: latestVisits, isLoading: visitsLoading, error: visitsError } = useGetLatestVisitsQuery(null);
    const { data: latestAppointments, isLoading: appointmentsLoading, error: appointmentsError } = useGetLatestAppointmentsQuery(null);
    const { data: doctors, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(null);
    const { data: patients, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null);

    const news = [...(latestAppointments || []), ...(latestVisits || [])];
    news.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    console.log("Sorted news:", news);

    if (appointmentsLoading || visitsLoading || doctorsLoading || patientsLoading) {
        return <Container>Loading...</Container>;
    }

    if (appointmentsError || visitsError || doctorsError || patientsError) {
        return <Container>Error: Unable to fetch data</Container>;
    }

    return (
        <Container>
            <Title>News</Title>
            {news.map((item) => (
                <NewsCard key={item.id}>
                    {item.hasOwnProperty("reason") ? (
                        <>
                            <NewsTitle>Appointment</NewsTitle>
                            <NewsDescription>
                                Patient {patients.find((patient: Patient) => patient.id === item.patientId)?.name} has made an appointment with Dr. {doctors.find((doctor: Doctor) => doctor.id === item.doctorId)?.name} at x.
                            </NewsDescription>
                        </>
                    ) : item.hasOwnProperty("therapy") ? (
                        <>
                            <NewsTitle>Visit</NewsTitle>
                            <NewsDescription>
                                Dr. {doctors.find((doctor: Doctor) => doctor.id === item.doctorId)?.name} has completed a visit for patient {patients.find((patient: Patient) => patient.id === item.patientId)?.name}.
                            </NewsDescription>
                        </>
                    ) : (
                        // Handle other types of news items here
                        null
                    )}
                </NewsCard>
            ))}
        </Container>
    );
}

export default NewsSection;
