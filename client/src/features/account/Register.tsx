/* eslint-disable react-hooks/rules-of-hooks */
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useRegisterMutation } from "../../app/APIs/accountApi";
import { useEffect, useState } from "react";
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";



const registerData = {
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: ""
};

function Register() {
    const [registerInputs, setRegisterInputs] = useState(registerData);
    const [registerUser] = useRegisterMutation();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const navigate = useNavigate();

    const data = registerUser.data;

    useEffect(() => {
        if (data) {
            const tempData = {
                name: data.name,
                lastName: data.lastName,
                userName: data.userName,
                email: data.email,
                password: data.password
            };
            setRegisterInputs(tempData);
        }
    }, [data]);

    const handleRegisterInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, registerInputs);
        setRegisterInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", registerInputs.name);
        formData.append("LastName", registerInputs.lastName);
        formData.append("UserName", registerInputs.userName);
        formData.append("Email", registerInputs.email);
        formData.append("Password", registerInputs.password);


        const currentLocation = window.location.pathname;

        const response = await registerUser(formData);

        if ('data' in response) {
            toastNotify("User created successfully", "success");
            navigate('/');
        } else if ('error' in response) {

            const error = response.error as FetchBaseQueryError;
            const { status } = error;
            console.log(response.error);
            //toastNotify(error.data, 'error');
            if (status) {
                useErrorHandler(error, navigate, currentLocation, setErrorMessages);
            } 

        }


        setLoading(false);
    };


    return (
        <>
            <Container>
                <Wrapper>
                    <LeftSide>
                        <LeftTitle>Welcome</LeftTitle>
                        <p style={{ color: "white", textAlign: "center" }} >Enter your personal details as a medical professional</p>
                    </LeftSide>
                    <RightSide>
                        {loading && <MainLoader />}
                        <Title> Create your account</Title>
                        {errorMessages.length > 0 && (
                            <div style={{ color: 'red' }}>
                                <ul>
                                    {errorMessages.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                            <FormControl>
                                <InputBox>
                                    <FontAwesomeIcon icon={faUser} className="icon" style={{ color: '#355070' }} />
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={registerInputs.name}
                                        onChange={handleRegisterInput}
                                    />
                                </InputBox>
                            </FormControl>

                            <FormControl>
                                <InputBox>
                                    <FontAwesomeIcon icon={faUser} className="icon" style={{ color: '#355070' }} />
                                    <Input
                                        type="text"
                                        name="lastName"
                                        placeholder="LastName"
                                        value={registerInputs.lastName}
                                        onChange={handleRegisterInput}
                                    />
                                </InputBox>
                            </FormControl>

                            <FormControl>
                                <InputBox>
                                    <FontAwesomeIcon icon={faEnvelope} className="icon" style={{ color: '#355070' }} />
                                    <Input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={registerInputs.email}
                                        onChange={handleRegisterInput}
                                    />
                                </InputBox>
                            </FormControl>

                            <FormControl >
                                <InputBox>
                                    <FontAwesomeIcon icon={faCircleUser} className="icon" style={{ color: '#355070' }} />
                                    <Input
                                        type="text"
                                        name="userName"
                                        placeholder="Username"
                                        value={registerInputs.userName}
                                        onChange={handleRegisterInput}
                                    />
                                </InputBox>
                            </FormControl>

                            <FormControl>
                                <InputBox style={{}}>
                                    <FontAwesomeIcon icon={faLock} className="icon" style={{ color: '#355070' }} />
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={registerInputs.password}
                                        onChange={handleRegisterInput}
                                    />
                                </InputBox>
                            </FormControl>
                            <Agreement>
                                By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                            </Agreement>
                            <Button> Register </Button>
                            <LinksContainer>
                                <Text>Already have an account? </Text>
                                <Link onClick={() => navigate(`/Login`)}>Login here!</Link>
                            </LinksContainer>
                        </Form>
                    </RightSide>
                </Wrapper>
            </Container>
        </>
    );
}
const Container = styled.div`
    margin: 10px 0;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    display: flex;
    width: 90%;
`;

const LeftSide = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #355070;
    border-radius: 20px 0 0 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
`;

const RightSide = styled.div`
    flex: 2;
    padding: 20px;
    background-color: white;
    border-radius: 0 20px 20px 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const LeftTitle = styled.h1`
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: #355070;
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormControl = styled.div`
    margin-bottom: 20px;
`;

const InputBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0 70px; /* Added margin */
`;

const Input = styled.input`
    flex: 1;
    border: none;
    border-bottom: 1px solid silver;
    padding: 8px; /* Adjusted padding */
    font-size: 0.9rem; /* Adjusted font size */
    outline: none;
`;

const Agreement = styled.span`
    margin: 10px 45px;
    font-size: 0.9rem;
    text-align: center;
`;

const Button = styled.button`
    width: 50%;
    padding: 15px;
    margin: 20px auto;
    border: none;
    border-radius: 5px;
    background-color: #355070;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #2a4365;
        transform: scale(1.1);

    }
`;

const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Text = styled.p`
    font-size: 0.9rem;
`;

const Link = styled.a`
   margin: 5px 3px;
  font-size: 12px;
  cursor: pointer;
  color:crimson;
  font-size: 1rem;
  font-weight: bold;
  transition: ease 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default Register;