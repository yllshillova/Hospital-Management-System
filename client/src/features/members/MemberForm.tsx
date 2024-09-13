/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Member from '../../app/models/Member';
import Group from '../../app/models/Group';
import { useCreateMemberMutation } from '../../app/APIs/memberApi';
import { useGetGroupsQuery } from '../../app/APIs/groupApi';

interface MemberFormProps {
    data?: Member;
}

const memberData: Member = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "",
    role: "",
    groupId: "",
    group: {} as Group
};



function MemberForm({ data }: MemberFormProps) {


    const [memberInputs, setMemberInputs] = useState<Member>(data || memberData);
    const [createMember] = useCreateMemberMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
   
    const { data : groupsData, isLoading : groupsLoading, error : groupsError } = useGetGroupsQuery(null);

    

    const handleMemberInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, memberInputs);
        setMemberInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("Name", memberInputs.name);
        formData.append("Role", memberInputs.role);

        formData.append("GroupId", memberInputs.groupId);

        const currentLocation = window.location.pathname; 

        const response = await createMember(formData);

        if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
        } else {
                toastNotify("Member has been created", "success");
                navigate('/members');
          }    
        

        setLoading(false);
    };



    return (
        <>
            <Header />
            <SidePanel />
            <OuterContainer>
                <Container>
                    <FormContainer >
                        {loading && <MainLoader />}
                        <Title>
                           Add Member
                        </Title>

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
                                    value={memberInputs.name}
                                    onChange={handleMemberInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Role</Label>
                                <Input
                                    type="text"
                                    name="role"
                                    value={memberInputs.role}
                                    onChange={handleMemberInput}
                                />
                            </FormGroup>


                            


                            <FormGroup>
                                <Select
                                    name="groupId"
                                    value={memberInputs.groupId}
                                    onChange={handleMemberInput}
                                    disabled={groupsLoading}
                                >
                                    <option value="">Select group</option>
                                    {groupsData && groupsData.map((group: Group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </Select>
                                {groupsError && <div style={{ color: 'red' }}>Error loading groups</div>}
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/members")}>
                                    Back to Members
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default MemberForm;
