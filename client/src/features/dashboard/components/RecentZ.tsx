import styled from "styled-components";
function RecentZ() {

    return (
        <Container flex={1}>
            <Title>Recent Z</Title>
            <TableContainer>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeader>Column</TableHeader>
                            <TableHeader>Column</TableHeader>
                        </TableHead>
                    </thead>
                    <tbody>
                        <TableRow>
                                <TableCell>Value</TableCell>
                                <TableCell>Value</TableCell>
                        </TableRow>
                        
                    </tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}
export default RecentZ;

const Container = styled.div<{ flex: number }>`
  border: 1px  #ddd;
  border-radius: 15px;
  padding: 15px;
  background-color: white;
  margin: 0 5px; /* Adjust the margin */
  flex: ${({ flex }) => flex};
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

export const TableRow = styled.tr`
  border-bottom: 1px solid #d3d3d3;
  &:nth-last-child(2) {
    border-bottom: none;
  }
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const TableHead = styled.tr`
  border-bottom: 1px solid #d3d3d3;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
`;