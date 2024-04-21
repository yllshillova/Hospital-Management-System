import styled from "styled-components";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";



function Login() {

    const navigate = useNavigate();

    return (
        <>
            <LoginContainer>

                <Title>Login</Title>
                <Form>
                    <FormControl>
                        <InputBox>
                            <FontAwesomeIcon icon={faUser} className="icon" />
                            <input
                                type="text"
                                name="userName"
                                placeholder="Enter your username"
                            />
                        </InputBox>
                    </FormControl>
                    <FormControl>
                        <InputBox>
                            <FontAwesomeIcon icon={faLock} className="icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
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
  position: absolute; /* Change from relative to absolute */
  top: 40%; /* Add top 50% */
  left: 50%; /* Add left 50% */
  transform: translate(-45%, -40%); /* Center the container */
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