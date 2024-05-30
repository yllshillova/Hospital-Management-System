import styled from "styled-components";


export const MainContainer = styled.div`
    margin-left: 200px;
    padding: 20px;
    margin-top: 50px;
`;
export const WrapperContainer = styled.div`
    display: flex;
    gap: 20px;
`;
export const LeftContainer = styled.div`
    flex: 1;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
`;
export const RightContainer = styled.div`
    flex: 2;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
`;
export const AdditionalInfoContainer = styled.div`
    margin-top: 16px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
`;
export const SectionTitle = styled.h2`
    font-size: 1.2rem;
    color: #1a252e; 
    margin-bottom: 20px;
`;
export const LabelsRow = styled.div`
    display: flex;
    gap: 100px;
    margin-bottom: 10px;
`;
export const ValuesRow = styled.div`
    display: flex;
    gap: 130px;
    font-weight:bold;
    margin-bottom: 15px;
`;
export const Attribute = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;
export const Label = styled.span`
    color: #696969; 
    margin-right: 10px; 
    width: 120px;
    margin-bottom: 5px;
`;
export const Value = styled.span`
    color: #000;
    font-weight:bold;
    margin-bottom: 5px;
`;
export const ErrorMessage = styled.span`
    font-size: 15px;
    border-radius: 10px; 
    background-color: white;
    padding: 10px 20px; 
    color: #696969; 
    margin: 50px 20px 0 220px;
`;

export  const BackButton = styled.button`
    position: absolute;
    bottom: 60px;
    right: 47px;
    background-color: #002147;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 13.5px;
    transition: ease 0.3s;
    font-weight: bold;
    &:hover {
        transform: scale(1.1);
    }
`;