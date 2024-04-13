import styled from "styled-components";
import { Header, SidePanel } from "../../Components/Layout/Dashboard";
import { useNavigate } from "react-router-dom";

const PatientUpsert = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <SidePanel />
            <OuterContainer>
                <Container>
                    <FormContainer>
                        {/*<Title>{id ? "Edit Patient" : "Add Patient"}</Title>*/}

                        <Title>Title</Title>
                        <Form
                            method="post"
                            encType="multipart/form-data"
                            
                        >
                            <FormGroup>
                                <Label>Title:</Label>
                                <Input
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Title:</Label>
                                <Input
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Title:</Label>
                                <Input
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Title:</Label>
                                <Input
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Title:</Label>
                                <Input
                                    required
                                />
                            </FormGroup>

                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToProductsButton onClick={() => navigate("/PatientList")}>
                                    Back to patients
                                </BackToProductsButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
};

const OuterContainer = styled.div`
  margin-left: 200px;

  background-color: #f5f5f5;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: white;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const FormContainer = styled.div`
  padding: 30px; 
`;

const Title = styled.h3`
  color: teal;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 750;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: #333;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 15px; // Increase the padding for larger inputs
  font-size: 16px; // Increase the font size for better visibility
  border: 1px solid #ddd;
  border-radius: 8px; // Increase the border-radius for rounded corners
  box-sizing: border-box;
`;

//const Select = styled.select`
//  width: 100%;
//  max-width: 100%;
//  padding: 15px;
//  font-size: 16px;
//  border: 1px solid #ddd;
//  border-radius: 8px;
//  box-sizing: border-box;
//`;

const SubmitButton = styled.button`
  width: 30%;
  padding: 8px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  margin-right: 5px;
  font-weight: 600;
  transition: ease 0.3s;

  &:hover {
    background-color: teal;
    color: white;
    transform: scale(1.1);
  }
`;

const BackToProductsButton = styled.button`
  width: 30%;
  padding: 8px;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  margin-left: 5px;
  font-weight: 600;
  transition: ease 0.3s;

  &:hover {
    color: black;
    transform: scale(1.1);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;
export default PatientUpsert;
