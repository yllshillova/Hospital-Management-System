import styled from "styled-components";
//import patientInBed from "../../app/layout/Images/patientInRoom.jpg";
import { Header, SidePanel } from "../../app/layout";
import { OrdersTable, TableHeader } from "../../app/common/styledComponents/table";
import { useGetRoomByIdQuery } from "../../app/APIs/roomApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Patient from "../../app/models/Patient";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import MainLoader from "../../app/common/MainLoader";
import { useGetVisitsQuery } from "../../app/APIs/visitApi";
import Visit from "../../app/models/Visit";
//import toastNotify from "../../app/helpers/toastNotify";
import manInHb from "../../app/layout/Images/manInHB.jpg";
import womanInHB from "../../app/layout/Images/womanInHB.jpg";
import emptyBed from "../../app/layout/Images/emptyBed.jpg";
function RoomDetails() {
    const { id } = useParams<string>();
    const { data: roomsData, isLoading: roomsLoading, error: roomsError, isError: roomsIsError } = useGetRoomByIdQuery(id);
    const { data: visitsData, isLoading: visitsLoading, error: visitsError, isError: visitsIsError } = useGetVisitsQuery(null);
    //const [removePatient, { isLoading: removingPatient }] = useRemovePatientMutation(); // useRemovePatientMutation hook

    const navigate = useNavigate();
    const location = useLocation();
    const patients: Patient[] = roomsData?.patients || [];

    const fbError = roomsError as FetchBaseQueryError;
    if (roomsIsError || visitsIsError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }
    if (roomsLoading || visitsLoading) return <MainLoader />;

    //array of visits for all patients
    const visits = visitsData?.filter((visit: Visit) => patients.some(patient => patient.id === visit.patientId));


    //const handleRemovePatient = async (patientId: string): Promise<void> => {
    //    try {
    //        const response = await removePatient(patientId);
    //        console.log(patientId);
    //        console.log(response);
    //        if (response.error) {
    //            // Handle error
    //            toastNotify("Failed to remove patient from room", "error");
    //        } else {
    //            // Handle success
    //            toastNotify("Patient removed from room successfully", "success");
    //        }
    //    } catch (error) {
    //        // Handle error
    //        toastNotify("An error occurred while removing patient from room", "error");
    //    }
    //};


    let content;
    if (patients.length === 0) {
        content = (
            <EmptyRoomContainer>
                <EmptyRoomTitle>No patient found in room #{roomsData?.roomNumber}</EmptyRoomTitle>
                <EmptyBedImage src={emptyBed} alt="Empty Bed" />
            </EmptyRoomContainer>

        );
    } else {
        content = patients.map(patient => {
            // returns the specific visit for the patient
            const patientVisit = visits.find((visit: Visit) => visit?.patientId === patient.id);
            return (
                <PatientCard key={patient.id}>
                    <ImageContainer>
                        <Image src={patient.gender === 'Male' ? manInHb : womanInHB} alt="Patient in bed" />
                    {/*    <RemovePatientButton onClick={() => handleRemovePatient(patient.id)} disabled={removingPatient}>Remove Patient</RemovePatientButton>*/}
                    </ImageContainer>
                    <PatientData>
                        <p>Name <strong>{patient.name} {" "} {patient.lastName}</strong> </p>
                        <p>Diagnosis <strong>{patientVisit?.diagnosis}</strong></p>
                        <p>Therapy <strong>{patientVisit?.therapy}</strong> </p>
                        <p>Remarks <strong>{patientVisit?.remarks}</strong></p>
                    </PatientData>
                </PatientCard>
            );
        });
    }

    return (
        <>
            <Header />
            <SidePanel />
            <OrdersTable>
                {patients.length > 0 &&
                    <TableHeader>Room #{roomsData?.roomNumber}</TableHeader>}
                <RoomContainer>
                    {content}
                </RoomContainer>
                <BackButton onClick={() => navigate('/rooms')}>Back to Rooms</BackButton>
            </OrdersTable>
        </>
    );
}
const RoomContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 9px;
    justify-content: space-between;
`;

const EmptyRoomContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-left: 180px;
    margin-top:10px;
`;

const EmptyRoomTitle = styled.h2`
    font-size: 18px;
`;

const EmptyBedImage = styled.img`
    width: 580px;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
`;

const PatientCard = styled.div`
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex: 0 0 calc(50% - 20px); /* Two cards per row with 20px gap */
    max-width: calc(50% - 20px); /* Two cards per row with 20px gap */
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
    position: relative; /* added to position the remove button */
    &:hover {
        transform: translateY(-5px);
    }

    @media (max-width: 700px) {
        flex-basis: calc(100% - 20px); /* One card per row with 20px gap */
        max-width: calc(100% - 20px); /* One card per row with 20px gap */
    }
`;

const ImageContainer = styled.div`
    position: relative;
    margin-top:15px;
`;

const Image = styled.img`
    width: 170px;
    height: 130px;
    margin-left:10px;
    object-fit: fit; /* Ensures the image maintains its aspect ratio */

`;

const PatientData = styled.div`
    flex: 1;
    padding: 20px;

    p {
        margin: 10px 0;
        font-size: 13.5px; /* Adjust font size */
    }
`;

//const RemovePatientButton = styled.button`
//    position: absolute;
//    top: 17px;
//    right: 10px; /* Adjusted for better alignment */
//    background-color: crimson;
//    color: #fff;
//    border: none;
//    border-radius: 4px;
//    padding: 5px 10px;
//    cursor: pointer;
//    font-size: 13.5px;
//    transition: ease 0.3s;

//    &:hover {
//        transform: scale(1.1);
//    }
//`;

const BackButton = styled.button`
    position: absolute;
    bottom: 60px;
    right: 47px;
    background-color: #002147;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 13.5px;
    transition: ease 0.3s;
    font-weight: bold;
    &:hover {
        transform: scale(1.1);
    }
`;

export default RoomDetails;
