import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateRoomMutation, useGetRoomByIdQuery, useUpdateRoomMutation } from "../../app/APIs/roomApi";
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, SubmitButton, Title } from "../../app/common/styledComponents/upsert";

const roomData = {
    capacity: "",
    isFree: false,
    patientId: ""
};
function RoomUpsert() {
    const { id } = useParams();
    const [roomInputs, setRoomInputs] = useState(roomData);
    const [createRoom] = useCreateRoomMutation();
    const [updateRoom] = useUpdateRoomMutation();
    const { data } = useGetRoomByIdQuery(id);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (data) {
            const tempData = {
                capacity: data.capacity,
                isFree: data.isFree,
                patientId: data.patientId
            };
            setRoomInputs(tempData);
        }
    }, [data]);

    const handleRoomInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempData = inputHelper(e, roomInputs);
        setRoomInputs(tempData);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();

        formData.append("Capacity", roomInputs.capacity);
        formData.append("IsFree", roomInputs.isFree.toString());
        formData.append("PatientId", roomInputs.patientId);

        let response;


        if (id) {
            formData.append("Id", id);
            console.log("Update room data :", Object.fromEntries(formData.entries()));

            response = await updateRoom({ data: formData, id });

            console.log("Update room Response: ", response);

            toastNotify("Room updated successfully", "success");
        } else {
            console.log("Create Room Data:", Object.fromEntries(formData.entries()));
            response = await createRoom(formData);
            console.log("Create Room response : ", response);
            toastNotify("Room created successfully", "success");
        }

        if (response) {
            setLoading(false);
            navigate('/rooms');
        }

        setLoading(false);
    }



    return (
        <>
            <Header />
            <SidePanel />
            <OuterContainer>
                <Container>
                    <FormContainer >
                        {loading && <MainLoader />}
                        {<Title>
                            {id ? "Edit Room" : "Add Room"}
                        </Title>}

                        <Form
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <FormGroup>
                                <Label>Capacity:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="capacity"
                                    value={roomInputs.capacity}
                                    onChange={handleRoomInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>isFree:</Label>
                                <Input
                                    type="checkbox"
                                    name="isFree"
                                    checked={roomInputs.isFree}
                                    onChange={(e) => setRoomInputs({ ...roomInputs, isFree: e.target.checked })}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>PatientId:</Label>
                                <Input
                                    type="text"
                                    required
                                    name="patientId"
                                    value={roomInputs.patientId}
                                    onChange={handleRoomInput}
                                />
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/rooms")}>
                                    Back to rooms
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}


export default RoomUpsert;