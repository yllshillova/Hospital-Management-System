import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateRoomMutation, useUpdateRoomMutation } from "../../app/APIs/roomApi";
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import Department from "../../app/models/Department";
import { useGetDepartmentsQuery } from "../../app/APIs/departmentApi";
import Room from "../../app/models/Room";
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";



interface RoomFormProps {
    id?: string;
    data?: Room;
}

const roomData: Room = {
    roomNumber: "",
    beds: "",
    bedsAvailable: "",
    departmentId: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    patients: [], 

};

function RoomForm({ id, data }: RoomFormProps) {

    const [roomInputs, setRoomInputs] = useState<Room>(data || roomData);
    const [createRoom] = useCreateRoomMutation();
    const [updateRoom] = useUpdateRoomMutation();
    const { data: departmentsData, isLoading: departmentsLoading, error: departmentsError } = useGetDepartmentsQuery(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);



    const handleRoomInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempData = inputHelper(e, roomInputs);
        setRoomInputs(tempData);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();

        formData.append("Beds", roomInputs.beds);
        formData.append("RoomNumber", roomInputs.roomNumber);
        //formData.append("BedsAvailable", roomInputs.bedsAvailable);
        formData.append("DepartmentId", roomInputs.departmentId);

        let response;


        if (id) {
            formData.append("Id", id);

            response = await updateRoom({ data: formData, id });


            toastNotify("Room has been updated", "success");
        } else {
            response = await createRoom(formData);
            toastNotify("Room has been created", "success");
        }

        if (response) {
            setLoading(false);
            navigate('/rooms');
        }

        setLoading(false);
    }

    //const toggleIsFree = () => {
    //    setRoomInputs((prevInputs) => ({
    //        ...prevInputs,
    //        isFree: !prevInputs.isFree,
    //    }));
    //};


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
                                <Label>Number:</Label>
                                <Input
                                    type="number"
                                    required
                                    name="roomNumber"
                                    value={roomInputs.roomNumber}
                                    onChange={handleRoomInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Beds:</Label>
                                <Input
                                    type="number"
                                    required
                                    name="beds"
                                    value={roomInputs.beds}
                                    onChange={handleRoomInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Select
                                    name="departmentId"
                                    value={roomInputs.departmentId}
                                    onChange={handleRoomInput}
                                    disabled={departmentsLoading}
                                >
                                    <option value="">Select Department</option>
                                    {departmentsData && departmentsData.map((department: Department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </Select>
                                {departmentsError && <div style={{ color: 'red' }}>Error loading departments</div>}
                            </FormGroup>
                            

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/rooms")}>
                                    Back to Rooms
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}


export default withAuthorization(RoomForm, [SD_Roles.ADMINISTRATOR]);