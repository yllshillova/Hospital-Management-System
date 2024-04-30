import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt, faUserDoctor, faBookMedical, faBedPulse, faFolderTree, faCalendarDays, faUserInjured } from '@fortawesome/free-solid-svg-icons';
//import { useDispatch } from 'react-redux';
//import {
//    emptyUserState,
//    setLoggedInUser,
//} from "../../Storage/Redux/userAuthSlice";
import { useNavigate } from 'react-router-dom';

function SidePanel() {

    //const dispatch = useDispatch();
    const navigate = useNavigate();

    //const handleLogout = () => {
    //    localStorage.removeItem("authToken");
    //    dispatch(setLoggedInUser({ ...emptyUserState })); //reseting the user , spreading out the emptyUserState
    //    navigate("/Login");
    //};

    //const handleHome = () => {
    //    navigate('/');
    //}

    const handlePatientList = () => {
        navigate('/patients');
    }

    const handleDepartmentsList = () => {
        navigate('/departments');
    }

    const handleRoomsList = () => {
        navigate('/rooms');
    }

    const handleDoctorsList = () => {
        navigate('/doctors');
    }

    const handleAppointmentsList = () => {
        navigate('/appointments');
    }

    const handleVisitsList = () => {
        navigate('/visits');
    }

    const menuItems = [
        { icon: faUserDoctor, label: 'Doctors', onClick: handleDoctorsList },
        { icon: faUserInjured, label: 'Patients', onClick: handlePatientList },
        { icon: faFolderTree, label: 'Departments', onClick: handleDepartmentsList },
        { icon: faCalendarDays, label: 'Appointments', onClick: handleAppointmentsList },
        { icon: faBookMedical, label: 'Visits', onClick: handleVisitsList },
        { icon: faBedPulse, label: 'Rooms', onClick: handleRoomsList },
        { icon: faCog, label: 'Settings' },
        { icon: faSignOutAlt, label: 'Logout' },

    ];

    return (
        <SidePanelContainer>
            {menuItems.map((item, index) => (
                <SidebarItem key={index} onClick={item.onClick}>
                
                    <IconWrapper>
                        <FontAwesomeIcon icon={item.icon} size="lg" />
                    </IconWrapper>
                    <Label>{item.label}</Label>
                </SidebarItem>
            ))}
        </SidePanelContainer>
    );
}

const SidePanelContainer = styled.div`
    position: fixed;
    top: 48px;
    left: 0;
    bottom: 0;
    min-width: 200px;
    background-color: #002147;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    z-index: 100;
    height: 100vh;

    @media screen and (max-width: 768px) {
        width: 60%;
    }

    @media screen and (max-width: 480px) {
        width: 40%;
    }

    @media screen and (max-width: 360px) {
        width: 80%;
    }
`;

const SidebarItem = styled.div`
    display: flex;
    align-items: center;
    color: #E8E8E8;
    font-size: 13.5px;
    cursor: pointer;
    padding: 12px;
    margin: 5px 10%;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #4C516D;
        border-radius: 8px;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-right: 10px;
    color: #E8E8E8;
    flex: 1;
`;

const Label = styled.div`
    font-weight: bold;
    flex: 3;
    align-self: flex-start;
`;


//const DropdownContainer = styled.div`
//  position: absolute;
//  top: 100%;
//  left: 100%;
//  background-color: #15283c;
//  border-radius: 5px;
//  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//  margin-top: 5px;
//`;

//const DropdownItem = styled.div`
//  padding: 10px;
//  color: white;
//  cursor: pointer;
//  transition: background-color 0.3s ease;

//  &:hover {
//    background-color: white;
//    color: #0C2340;
//  }
//`;
export default SidePanel;