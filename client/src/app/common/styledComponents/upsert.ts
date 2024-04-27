import styled from "styled-components";

export const OuterContainer = styled.div`
  margin-left: 200px;
  padding: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: white;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;

export const FormContainer = styled.div`
  padding: 30px; 
`;

export const Title = styled.h3`
  color: #1a252e;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 750;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  color: #333;
  margin-bottom: 15px;
  margin-left:5px;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 15px; // Increase the padding for larger inputs
  font-size: 16px; // Increase the font size for better visibility
  border: 1px solid #ddd;
  border-radius: 8px; // Increase the border-radius for rounded corners
  box-sizing: border-box;
`;

export const Select = styled.select`
  width: 100%;
  max-width: 100%;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const SubmitButton = styled.button`
  width: 30%;
  padding: 8px;
  background-color: #1a252e;
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
    transform: scale(1.1);
  }
`;

export const BackToProductsButton = styled.button`
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

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;