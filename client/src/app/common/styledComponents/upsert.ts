import styled from "styled-components";

export const OuterContainer = styled.div`
  margin-left: 170px;
  padding: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  border-radius: 15px;
  background-color: white;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;

export const FormContainer = styled.div`
  padding: 15px;
`;

export const Title = styled.h3`
  color: #1a252e;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 750;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const FormGroup = styled.div`
  width: calc(50% - 10px);
  margin-bottom: 20px;
`;

export const Label = styled.label`
  color: #333;
  margin-bottom: 5px;
  font-size: 14px;
margin-left:7px;
`;

export const Input = styled.input`
  width: 100%; /* Take full width */
  padding: 8px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  box-sizing: border-box;
`;

export const Select = styled.select`
  width: 100%; /* Take full width */
  padding: 8px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  box-sizing: border-box;
`;

export const SubmitButton = styled.button`
  width: 48%;
  padding: 13px ;
  background-color: #002147;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  font-weight: 600;
  transition: ease 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

export const BackToProductsButton = styled.button`
  width: 48%;
  padding: 13px;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  font-weight: 600;
  transition: ease 0.3s;
  &:hover {
    color: black;
    transform: scale(1.1);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left:160px;
  width: 50%;
`;
