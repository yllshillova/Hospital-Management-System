import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const OrdersTable = styled.div`
  padding: 20px;
  margin-left: 200px;
  margin-top: 50px;
  @media screen and (max-width: 768px) {
    padding: 10px; 
    margin-left: 0; 
    margin-top: 30px; 
  }
`;

export const TableHeader = styled.h1`
font-size: 18px;
font-weight: bold;
margin: 0px 8px;
margin-top:15px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 15px;
  background-color: white;
`;

export const TableHead = styled.tr`
  border-bottom: 1px solid #d3d3d3;
`;

export const TableRow = styled.tr`
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const TableHeaderCell = styled.th`
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

export const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  white-space: nowrap; 
`;

export const ActionButton = styled.button`
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 15px 5px; 
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ease 0.3s;

  &:hover {
    background-color: teal;
    transform: scale(1.1);
  }
`;

export const AddButton = styled.button`
  background: #002147;;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 5px; 
  border-radius: 5px;
  cursor: pointer;
  transition: ease 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

export const TableNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ErrorMessage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 10px;
    padding: 15px;
    margin: 90px 300px 0 auto; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    animation: fadeIn 3s ease;
    max-width: 450px; 

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    svg {
        font-size: 30px;
        margin-bottom: 10px;
        color: #dc3545;
        animation: bounce 3s infinite;
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-5px);
        }
        60% {
            transform: translateY(-2px);
        }
    }
`;

export const BackButton = styled.button`
    background-color: #721c24;
    color: #f8d7da;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #5a1720;
        transform: scale(1.05);
    }
`;

export const ErrorIcon = styled(FontAwesomeIcon)`
    font-size: 30px;
    color: #dc3545;
    margin-right: 10px;
    margin-top:5px;
`;

export const ErrorTitleRow = styled.div`
    display: flex;
    align-items: left;
    justify-content: left;
    margin-bottom: 5px;
`;

export const Message = styled.p`
    font-size: 16px;
    color: #666;
    margin-bottom: 15px;
    max-width: 450px;
`;

export const ErrorCard = styled.div`
    width: 500px; /* Adjust the width as needed */
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 8px;
    margin-bottom: 8px;
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
    }
`;

export const ErrorDescription = styled.p`
    font-size: 13.5px;
    margin: 0;
    font-weight:bold;
    margin-top:10px;
`;