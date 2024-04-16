import styled from "styled-components";

export const OrdersTable = styled.div`
padding: 20px;
margin-left: 200px; /*  based on the width of SidePanelContainer */
background-color: #f5f5f5;
margin-top:50px;

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
border-radius:15px;
background-color:white;
`;

export const TableRow = styled.tr`
border-bottom: 1.0px solid #d3d3d3;
`;

export const TableHeaderCell = styled.th`
font-weight: bold;
padding: 10px;
text-align: center;
`;

export const TableCell = styled.td`
padding: 12px;
text-align: center;
white-space: wrap; /*  line to prevent text wrapping */
`;

export const ActionButton = styled.button`
color: white;
border: none;
border-radius: 4px;
padding: 8px 16px;
margin: 70px 5px;
align-items: center;
justify-content: center;
cursor: pointer;
transition: ease 0.3s;

&:hover {
    background-color: teal;
    color: white;
    transform: scale(1.1);
}

`;
export const AddButton = styled.button`
background: teal;
color: white;
border: none;
padding: 8px 16px;
margin:5px;
border-radius: 5px;
cursor: pointer;
transition: ease 0.3s;

&:hover {
    background-color: teal;
    color: white;
    transform: scale(1.1);
}

`;

export const TableNav = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom:10px;
`;

