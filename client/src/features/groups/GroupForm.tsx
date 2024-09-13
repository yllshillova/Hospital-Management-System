/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer ,SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Group from '../../app/models/Group';
import { useCreateGroupMutation, useUpdateGroupMutation } from '../../app/APIs/groupApi';

interface GroupFormProps {
    id?: string;
    data?: Group;
}

const groupData: Group = {
    name: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    description:""
};

function GroupForm({ id, data }:  GroupFormProps) {

    const [groupInputs, setGroupInputs] = useState<Group>(data || groupData);
    const [createGroup] = useCreateGroupMutation();
    const [updateGroup] = useUpdateGroupMutation();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]); 


   


    const handleGroupInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const tempData = inputHelper(e, groupInputs);
        setGroupInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", groupInputs.name);
        formData.append("Description", groupInputs.description);

              

        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);

            const response = await updateGroup({ data: formData, id });

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Group has been updated ", "success");
                navigate('/groups');
            }
        } else {
            const response = await createGroup(formData);

            if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Group has been created", "success");
                navigate('/groups');
            }
        }                       

        setLoading(false);
    };

    

    let content;

        content = (
            <>
                <Header />
                <SidePanel />
                <OuterContainer>
                    <Container>
                        <FormContainer >
                            {loading && <MainLoader />}
                            <Title>
                                {id ? "Edit Group" : "Add Group"}
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
                            >
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={groupInputs.name}
                                        onChange={handleGroupInput}
                                    />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input
                                        type="text"
                                        name="description"
                                        value={groupInputs.description}
                                        onChange={handleGroupInput}
                                    />
                                </FormGroup>

                               
                                <ButtonsContainer>
                                    <SubmitButton type="submit">
                                        Submit
                                    </SubmitButton>
                                    <BackToProductsButton onClick={() => navigate("/groups")}>
                                        Back to Groups
                                    </BackToProductsButton>
                                </ButtonsContainer>
                            </Form>
                        </FormContainer>
                    </Container>
                </OuterContainer>
            </>
        );
        return content;
    }

export default GroupForm;
