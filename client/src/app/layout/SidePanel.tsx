import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt, faHospitalUser, faUserDoctor, faBookMedical, faBedPulse, faFolderTree, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
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

    //const handleAllOrders = () => {
    //    navigate('/AllOrders');
    //}
    //const handleAllUsers = () => {
    //    navigate('/UsersList');
    //}

    //const menuItems = [
    //    { icon: faHome, label: 'Home', color: 'crimson', onClick: handleHome },
    //    { icon: faUsers, label: 'Users', color: 'darkorange', onClick: handleAllUsers },
    //    { icon: faBoxOpen, label: 'Products', color: '#007FFF', onClick: handlePL },
    //    { icon: faClipboardList, label: 'Orders', color: '#F9629F', onClick: handleAllOrders },
    //    { icon: faCog, label: 'Settings', color: '#5F9EA0' },
    //    { icon: faSignOutAlt, label: 'Logout', color: 'yellow', onClick: handleLogout },

    //];

    const menuItems = [
        { icon: faUserDoctor, label: 'Doctors', onClick: handleDoctorsList },
        { icon: faHospitalUser, label: 'Patients', onClick: handlePatientList },
        { icon: faFolderTree, label: 'Departments', onClick: handleDepartmentsList },
        { icon: faCalendarDays, label: 'Appointments', onClick: handleAppointmentsList },
        { icon: faBookMedical, label: 'Visits' },
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
  top: 48px; /* Adjust based on the height of Header */
  left: 0;
  bottom: 0;
  min-width: 200px;
  background-color: #1a252e  ;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  height: 100vh;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  color: #E8E8E8		;
  font-size: 13.5px; /* Reduced font size */
  cursor: pointer;
  padding: 12px; /* Equal padding on left and right */
  margin: 5px 10%; /* Adjusted margin */
  transition: background-color 0.3s ease;

  &:hover {
    background-color:#4C516D; /* Light gray background on hover */
    border-radius: 8px; /* Rounded corners on hover */
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px; /* Add margin between icon and label */
  color: #E8E8E8;
  flex: 1; /* Grow to fill available space */
`;

const Label = styled.div`
  font-weight: bold; /* Make the label bold */
  flex: 3; /* Grow to fill available space */
  align-self: flex-start; /* Align text to start from the left */
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