/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/APIs/accountApi";
import { useEffect, useState } from "react";
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { useDispatch } from "react-redux";
import { setLoggedInUser, setToken } from "../../app/storage/redux/authSlice";
import { jwtDecode } from "jwt-decode";
import User from "../../app/models/User";
import BarLoader from "react-spinners/BarLoader";


const loginData = {
    email: "",
    password: ""
};

function Login() {
    const dispatch = useDispatch();
    const [loginInputs, setLoginInputs] = useState(loginData);
    const [loginUser] = useLoginMutation();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const navigate = useNavigate();

    const data = loginUser.data;

    useEffect(() => {
        if (data) {
            const tempData = {
                email: data.email,
                password: data.password
            };
            setLoginInputs(tempData);
        }
    }, [data]);

    const handleLoginInput= (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, loginInputs);
        setLoginInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();
        formData.append("Email", loginInputs.email);
        formData.append("Password", loginInputs.password);

        const currentLocation = window.location.pathname;

        const response = await loginUser(formData);

        if ('data' in response) {

            const { accessToken, refreshToken } = response.data;

            const { id, name, lastName, email, role }: User = jwtDecode(accessToken);

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            dispatch(setToken({ accessToken, refreshToken }));
            dispatch(setLoggedInUser({ id, name, lastName, email, role, accessToken }));

            toastNotify(`Welcome ${name}`);
            navigate('/');
        } else if ('error' in response) {

            const error = response.error as FetchBaseQueryError;
            if ('data' in error) {
                toastNotify((error.data as string), 'error');
            }

            const { status } = error;
            if (status) {
                useErrorHandler(error, navigate, currentLocation, setErrorMessages);
            }
        }
        setLoading(false);
    };

    return (
        <>
            <LoginContainer>
                {loading && <BarLoader color="#355070" />}
                <Title>Login</Title>
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
                            <FontAwesomeIcon icon={faUser} className="icon" />
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={loginInputs.email}
                                onChange={handleLoginInput}
                            />
                        </InputBox>
                    </FormControl>
                    <FormControl>
                        <InputBox>
                            <FontAwesomeIcon icon={faLock} className="icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginInputs.password}
                                onChange={handleLoginInput}
                            />
                        </InputBox>
                    </FormControl>
                    <Button >Login</Button>
                </Form>

                <LinksContainer>
                    <Text>Don't have an account yet?</Text>
                    <UnderLink
                        onClick={() => {
                            navigate(`/Register`);
                        }}
                    >
                        Create one!
                    </UnderLink>
                </LinksContainer>
            </LoginContainer>
        </>
    );
}

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 430px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 40%; /* Add top 50% */
  left: 50%; /* Add left 50% */
  transform: translate(-45%, -40%);
  z-index: 1;
`;

const Title = styled.div`
  font-size: 2.2rem;
    font-weight: bold;

  margin-top: 5px;
  margin-bottom: 15px;
  color: #355070;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;
const InputBox = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  width: 88%;
  margin: 10px auto;

  input {
    border: none;
    font-size: 1rem;
    width: calc(100% - 30px);
    font-weight: normal;
    line-height: 1.4rem;
    color: #;
    padding: 1rem 0;
    border-radius: 0;
    outline: 0;
    position: relative;
    border-bottom: 2px solid #aaa;
  }

  .icon {
    flex: 0 0 auto;
    margin-right: 10px;
    font-size: 1rem;
    color: #355070  
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
`;

const UnderLink = styled.a`
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

const LinksContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  margin: 5px 5px;
  font-size: 1rem;
  font-weight: normal;
`;

const Button = styled.button`
  width: 86%;
  max-width: 400px;
  border-radius: 5px;
  border: none;
  padding: 15px 20px;
  background-color: #355070;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  transition: ease 0.3s;
  font-weight: bold;
  &:hover {
    color: white;
    transform: scale(1.1);
  }
`;
export default Login;