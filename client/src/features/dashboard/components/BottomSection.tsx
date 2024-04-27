import styled from "styled-components";
function BottomSection() {

    return (
        <Container >
            <Title>Section</Title>
            <TableContainer>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>{""}</TableHeader>
                            <TableHeader>Column</TableHeader>
                            <TableHeader>Column</TableHeader>
                            <TableHeader>Column</TableHeader>
                            <TableHeader>Column</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        
                            <TableRow >
                                <TableCell>
                                <ProductImage
                                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                                    alt="Product Image" />
                                </TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                    </tbody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default BottomSection;

const Container = styled.div`
  border: 1px  #ddd;
  border-radius: 15px;
  padding: 15px;
  background-color: white;
  margin: 35px 62px;
  
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 9px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5; 
  }
  border-bottom: 1px solid #F5F5F5;

`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #F5F5F5;
`;

const TableCell = styled.td`
  padding: 10px;
`;
const ProductImage = styled.img`
  width: 50px; 
  height: 50px; 
  border-radius: 50%; 
  border : 1px solid silver;
  margin-right: 10px; 
  object-fit:contain;
`;
