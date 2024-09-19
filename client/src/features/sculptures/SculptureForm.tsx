/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import { BackToProductsButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from "../../app/common/styledComponents/upsert";
import { Header, SidePanel } from '../../app/layout';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Sculpture from '../../app/models/Sculpture';
import Sculptor from '../../app/models/Sculptor';
import { useCreateSculptureMutation } from '../../app/APIs/sculptureApi';
import { useGetSculptorsQuery } from '../../app/APIs/sculptorApi';

interface SculptureFormProps {
    data?: Sculpture;
}

const sculptureData: Sculpture = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "",
    material: "",
    isDeleted: false,
    sculptorId: "",
    sculptor: {} as Sculptor
};



function SculptureForm({ data }: SculptureFormProps) {


    const [sculptureInputs, setSculptureInputs] = useState<Sculpture>(data || sculptureData);
    const [createSculpture] = useCreateSculptureMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
   
    const { data : sculptorsData, isLoading : sculptorsLoading, error : sculptorsError } = useGetSculptorsQuery(null);

    useEffect(() => {
        if (data) {
            const tempData = {
                ...sculptureInputs,
                isDeleted: data.isDeleted.toString() === "true",
            }
            setSculptureInputs(tempData);
        }
    }, [data]);

    const handleSculptureInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, sculptureInputs);
        setSculptureInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]); 

        const formData = new FormData();

        formData.append("Title", sculptureInputs.title);
        formData.append("material", sculptureInputs.material);
        formData.append("IsDeleted", sculptureInputs.isDeleted.toString());

        formData.append("SculptorId", sculptureInputs.sculptorId);

        const currentLocation = window.location.pathname; 

        const response = await createSculpture(formData);

        if ('error' in response) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
        } else {
                toastNotify("Sculpture has been created", "success");
                navigate('/sculptures');
          }    
        

        setLoading(false);
    };

    
    //const toggleIsDeleted = () => {
    //    setSculptureInputs((prevInputs) => ({
    //        ...prevInputs,
    //        isDeleted: !prevInputs.isDeleted,
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
                        <Title>
                           Add Sculpture
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
                                <Label>Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={sculptureInputs.title}
                                    onChange={handleSculptureInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Material</Label>
                                <Input
                                    type="text"
                                    name="material"
                                    value={sculptureInputs.material}
                                    onChange={handleSculptureInput}
                                />
                            </FormGroup>


                            {/* <FormGroup>*/}
                            {/*    <Label>*/}
                            {/*        Is Deleted{" "}*/}
                            {/*        <input*/}
                            {/*            type="checkbox"*/}
                            {/*            name="isDeleted"*/}
                            {/*            checked={sculptureInputs.isDeleted.toString() === "true"}*/}
                            {/*            onChange={toggleIsDeleted}*/}
                            {/*        />*/}
                            {/*    </Label>*/}
                            {/*</FormGroup>*/}
                            


                            <FormGroup>
                                <Select
                                    name="sculptorId"
                                    value={sculptureInputs.sculptorId}
                                    onChange={handleSculptureInput}
                                    disabled={sculptorsLoading}
                                >
                                    <option value="">Select Sculptor</option>
                                    {sculptorsData && sculptorsData.map((sculptor: Sculptor) => (
                                        <option key={sculptor.id} value={sculptor.id}>
                                            {sculptor.name}
                                        </option>
                                    ))}
                                </Select>
                                {sculptorsError && <div style={{ color: 'red' }}>Error loading sculptors</div>}
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/sculptures")}>
                                    Back to Sculptures
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default SculptureForm;
