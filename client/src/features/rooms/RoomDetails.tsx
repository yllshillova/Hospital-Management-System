/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from "react-router-dom";
import { useGetRoomByIdQuery } from "../../app/APIs/roomApi";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";


function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function RoomDetails() {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetRoomByIdQuery(id);
    const navigate = useNavigate();

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate);
    }

    if (isLoading) return <MainLoader />;





    if (data) {
        const room = data;
        console.log(room.isFree);
        return (
            <>
                <div>
                    <h2>Room Details</h2>
                    <p>Id: {room.id}</p>
                    <p>Capacity: {room.capacity}</p>
                    <p>IsFree: {room.isFree}</p>
                    <p>PatientId: {room.patientId }</p>
                    <p>Created At: {new Date(room.createdAt).toLocaleDateString()}</p>
                    <p>Updated At: {new Date(room.updatedAt).toLocaleDateString()}</p>
                </div>
            </>
        );
    }
    return null;
}

export default RoomDetails;
