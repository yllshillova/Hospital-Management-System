import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateRoomMutation, useGetRoomByIdQuery, useUpdateRoomMutation } from "../../app/APIs/roomApi";
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { Header, SidePanel } from "../../app/layout";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import Department from "../../app/models/Department";
import { useGetDepartmentsQuery } from "../../app/APIs/departmentApi";

const roomData = {
    roomNumber: "",
    beds: "",
    //bedsAvailable: "",
    departmentId: ""
    /*patientId: ""*/
};
function RoomUpsert() {
    const { id } = useParams();
    const [roomInputs, setRoomInputs] = useState(roomData);
    const [createRoom] = useCreateRoomMutation();
    const [updateRoom] = useUpdateRoomMutation();
    const { data: departmentsData, isLoading: departmentsLoading, error: departmentsError } = useGetDepartmentsQuery(null);
    const { data } = useGetRoomByIdQuery(id);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (data) {
            const tempData = {
                beds: data.beds,
                roomNumber: data.roomNumber,
                //bedsAvailable: data.bedsAvailable,
                departmentId : data.departmentId
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

        formData.append("Beds", roomInputs.beds);
        formData.append("RoomNumber", roomInputs.roomNumber);
        //formData.append("BedsAvailable", roomInputs.bedsAvailable);
        formData.append("DepartmentId", roomInputs.departmentId);

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