import { useGetLatestAppointmentsQuery } from "../../app/APIs/appointmentApi";
import { useGetDoctorsQuery } from "../../app/APIs/doctorApi";
import { useGetLatestPatientsQuery, useGetPatientsQuery } from "../../app/APIs/patientApi";
import { useGetLatestVisitsQuery } from "../../app/APIs/visitApi";
import styled from 'styled-components';


function NewsSection() {

    const { data: latestVisits, isLoading: visitsLoading, error: visitsError } = useGetLatestVisitsQuery(null);
    const { data: latestAppointments, isLoading: appointmentsLoading, error: appointmentsError } = useGetLatestAppointmentsQuery(null);
    const { data: doctors, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(null);
    const { data: patients, isLoading: patientsLoading, error: patientsError } = useGetPatientsQuery(null);
    const { data: latestPatients, isLoading: latestpatientsLoading, error: latestPatientsError } = useGetLatestPatientsQuery(null);

    const news = [...(latestAppointments || []), ...(latestVisits || []), ...(latestPatients || [])];
    news.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    console.log("Sorted news:", news);

    if (appointmentsLoading || visitsLoading || doctorsLoading || patientsLoading || latestpatientsLoading) {
        return <Container>Loading...</Container>;
    }

    if (appointmentsError || visitsError || doctorsError || patientsError || latestPatientsError) {
        return <Container>Error: Unable to fetch data</Container>;
    }

    function getFullName(entityId: number, entities: any[]): string {
        const entity = entities.find((item) => item.id === entityId);
        if (entity) {
            return `${entity.name} ${entity.lastName}`;
        }
        return '';
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
                                Patient {getFullName(item.patientId, patients)} has made an appointment with Dr. {getFullName(item.doctorId, doctors)} on {new Date(item.checkInDate).toLocaleString()}
                            </NewsDescription>
                        </>
                    ) : item.hasOwnProperty("therapy") ? (
                        <>
                            <NewsTitle>Visit</NewsTitle>
                            <NewsDescription>
                                    Dr. {getFullName(item.doctorId, doctors)} has completed a visit for patient {getFullName(item.patientId, patients)}
                            </NewsDescription>
                        </>
                        ) : (
                                <>
                                    <NewsTitle>Patient</NewsTitle>
                                    <NewsDescription>
                                    {getFullName(item.id, latestPatients)} has been added to the hospital
                                     </NewsDescription>
                                </>
                    )}
                </NewsCard>
            ))}
        </Container>
    );
}
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
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
    }
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
export default NewsSection;


