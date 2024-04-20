import styled from 'styled-components';
import { Header, SidePanel } from '../layout';
function Details() {
    return (
        <>
            <Header />
            <SidePanel />

            <MainContainer>
                <WrapperContainer>

                    <LeftContainer>
                        <SectionTitle>Patient Details</SectionTitle>
                        <Attribute>
                            <label style={{ fontWeight: "bold", color: "#009F6B" }}>Active ? </label>
                        </Attribute>
                        <Attribute>
                            <Label>Name</Label>
                            <Value>Rinor</Value>
                        </Attribute>
                        <Attribute>
                            <Label>Last Name</Label>
                            <Value>Salihu</Value>
                        </Attribute>
                        <Attribute>
                            <Label>Parent Name</Label>
                            <Value>Kofi</Value>
                        </Attribute>
                        <Attribute>
                            <Label>Residence</Label>
                            <Value>Kingston</Value>
                        </Attribute>
                        <Attribute>
                            <Label>Personal Number</Label>
                            <Value>1111122222</Value>
                        </Attribute>
                    </LeftContainer>

                    <RightContainer>
                        <SectionTitle>Personal Information</SectionTitle>
                        <LabelsRow>
                            <Label>Address</Label>
                            <Label>Phone Number</Label>
                            <Label>Email</Label>
                        </LabelsRow>
                        <ValuesRow>
                            <Value>Jamica 23, nr4</Value>
                            <Value>044567892</Value>
                            <Value>rin1233@gmail.com</Value>
                        </ValuesRow>

                        <LabelsRow>
                            <Label>Birthday</Label>
                            {/*<Label>Blood Group</Label>*/}
                            <Label>Occupation</Label>
                        </LabelsRow>
                        <ValuesRow>
                            <Value>01/24/2002</Value>
                            {/*<Value> A+</Value>*/}
                            <Value>Software Engineer</Value>
                        </ValuesRow>
                        <LabelsRow>
                            {/*<Label>Allergies</Label>*/}
                            <Label>Room ID</Label>

                        </LabelsRow>
                        <ValuesRow>
                            {/*<Value>Lactose , Paracetamol Lactose</Value>*/}
                            <Value>3425638723</Value>

                        </ValuesRow>

                    </RightContainer>
                </WrapperContainer>

                <AdditionalInfoContainer>
                    <SectionTitle>Additional Information</SectionTitle>
                    <LabelsRow>
                        <Label>Blood Group</Label>
                        <Label></Label>
                        <Label></Label>
                        <Label>Allergies</Label>
                    </LabelsRow>
                    <ValuesRow>
                        <Value style={{color:"crimson", fontWeight:"bold"} }>A+</Value>
                        <Value></Value>
                        <Value></Value>
                        <Value></Value>
                        <Value></Value>
                        <Value>Lactose Intolerant , Paracetamol</Value>
                    </ValuesRow>
                </AdditionalInfoContainer>
            </MainContainer>
        </>
    );
};
const MainContainer = styled.div`
    margin-left: 200px;
    padding: 20px;
    margin-top: 45px;
`;
const WrapperContainer = styled.div`
    display: flex;
    gap: 20px;
`;
const LeftContainer = styled.div`
    flex: 1;
    background-color: white;
    border: 1px solid #A9A9A9;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const RightContainer = styled.div`
    flex: 2;
    background-color: white;
    border: 1px solid #A9A9A9;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
`;
const AdditionalInfoContainer = styled.div`
    margin-top: 16px;
    background-color: white;
    padding: 20px;
    border: 1px solid #A9A9A9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const SectionTitle = styled.h2`
    font-size: 1.2rem;
    color: #1a252e; 
    margin-bottom: 20px;
`;
const LabelsRow = styled.div`
    display: flex;
    gap: 100px;
    margin-bottom: 10px;
`;
const ValuesRow = styled.div`
    display: flex;
    gap: 130px;
    font-weight:bold;
    margin-bottom: 15px;
`;
const Attribute = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;
const Label = styled.span`
    color: #696969	; 
    margin-right: 10px; 
    width: 120px;
    margin-bottom: 5px;
`;
const Value = styled.span`
    color: #000;
    font-weight:bold;
    margin-bottom: 5px;
`;
export default Details;