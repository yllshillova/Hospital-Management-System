import styled from "styled-components";

export const OrdersTable = styled.div`
  padding: 20px;
  margin-left: 200px;
  margin-top: 50px;
  @media screen and (max-width: 768px) {
    padding: 10px; /* Adjusted padding for smaller screens */
    margin-left: 0; /* Adjusted margin for smaller screens */
    margin-top: 30px; /* Adjusted margin-top for smaller screens */
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
  border-bottom: 1px solid #d3d3d3;
  &:nth-last-child(2) {
    border-bottom: none;
  }
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
  margin: 15px 5px; /* Adjusted margin */
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
  margin: 5px; /* Adjusted margin */
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
