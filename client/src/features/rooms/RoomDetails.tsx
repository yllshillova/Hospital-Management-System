/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetPatientByIdQuery } from "../../app/APIs/patientApi"; // Importimi i query për të marrë të dhëna të pacientit
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useGetRoomByIdQuery } from "../../app/APIs/roomApi";
import useErrorHandler from "../../app/helpers/useErrorHandler";


function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function RoomDetails() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetRoomByIdQuery(id);
    const { data: patientData, isLoading: patientLoading } = useGetPatientByIdQuery(data?.patientId); // Marrja e të dhënave të pacientit nga ID-ja e pacientit në departament
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



    if (isLoading || patientLoading) return <MainLoader />;

    if (data) {
        const room = data;
        const patientName = patientData?.name || 'Unknown';

        return (
            <>
                <div>
                    <h2>Room Details</h2>
                    <p>Id: {room.id}</p>
                    <p>Capacity: {room.capacity}</p>
                    <p>Status: {room.isFree === false ? "Occupied" : "Free"}</p>
                    <p>Patient Name: {patientName}</p> {/* Shfaq emrin e pacientit */}
                    <p>Created At: {new Date(room.createdAt).toLocaleDateString()}</p>
                    <p>Updated At: {new Date(room.updatedAt).toLocaleDateString()}</p>
                </div>
            </>
        );
    }
    return null;
}

export default RoomDetails;
