import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBoxOpen, faClipboardList,  faUsers } from '@fortawesome/free-solid-svg-icons';

function Sections() {

    const sectionsData = [
        { icon: faUsers, label: 'Column', value: 0, color: 'crimson' },
        { icon: faBoxOpen, label: 'Column', value:  0, color: 'darkorange' },
        { icon: faClipboardList, label: 'Column', value: 0, color: 'darkblue' },
        { icon: faUsers, label: 'XX', value: 0, color: 'teal' },
    ];

    return (
        <SectionsContainer>
            {sectionsData.map((section, index) => (
                <SectionBox key={index} color={section.color}>
                    <SectionContent>
                        <SectionValue>{section.value}</SectionValue>
                        <SectionLabel>{section.label}</SectionLabel>
                    </SectionContent>
                    <IconWrapper>
                        <FontAwesomeIcon icon={section.icon} size="2x" color='white' />
                    </IconWrapper>
                </SectionBox>
            ))}
        </SectionsContainer>
    );
}

const SectionsContainer = styled.div`
  margin: 30px;
  display: flex;
  justify-content: space-around; 
`;

const SectionBox = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 180px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.color};
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SectionContent = styled.div`
  text-align: left;
  margin-right: 10px;
`;

const SectionValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color:white;
`;

const SectionLabel = styled.div`
  font-weight: bold;
  color:white;
`;

const IconWrapper = styled.div`
  margin-left: auto;
`;

export default Sections;
