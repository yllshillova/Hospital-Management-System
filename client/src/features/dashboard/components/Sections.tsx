import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faFolderTree, faUserNurse, faUserInjured } from '@fortawesome/free-solid-svg-icons';
import { useGetDepartmentsCountQuery } from '../../../app/APIs/departmentApi';
import { useGetDoctorsCountQuery } from '../../../app/APIs/doctorApi';
import { useGetPatientsCountQuery } from '../../../app/APIs/patientApi';
import MiniLoader from '../../../app/common/MiniLoader';

function Sections() {

    const { data: departmentsCount, isLoading: departmentsLoading, error: depError } = useGetDepartmentsCountQuery({});
    const { data: doctorsCount, isLoading: doctorsLoading, error: docError } = useGetDoctorsCountQuery({});
    // TODO const { data: nursesCount } = useGetNursesCountQuery({});
    const { data: patientsCount, isLoading: patientsLoading, error: patError } = useGetPatientsCountQuery({});

    const sectionsData = [
        { icon: faFolderTree, label: 'Departments', value: departmentsCount || "No", color: '#72A0C1' },
        { icon: faUserDoctor, label: 'Doctors', value: doctorsCount || "No", color: '#5072A7' },
        { icon: faUserNurse, label: 'Nurses', value: "No", color: '#00538C' },
        { icon: faUserInjured, label: 'Patients', value: patientsCount || "No", color: '#002244' },

    ];
    let content;

    if (departmentsLoading || doctorsLoading || patientsLoading) {
        content = <MiniLoader />;
    } else if (depError || docError || patError) {
        content = <div>Error loading data</div>
    }
    else {
        content = sectionsData.map((section, index) => (

                <SectionBox key={index} color={section.color}>
                    <SectionContent>
                        <SectionValue>{section.value}</SectionValue>
                        <SectionLabel>{section.label}</SectionLabel>
                    </SectionContent>
                    <IconWrapper>
                        <FontAwesomeIcon icon={section.icon} size="2x" color='white' />
                    </IconWrapper>
                </SectionBox>
        ));
    }
    return (
        <SectionsContainer>
            {content}
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
  padding: 25px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 140px;
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