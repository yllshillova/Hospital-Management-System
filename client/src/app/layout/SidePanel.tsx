import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserDoctor, faBookMedical, faBedPulse, faFolderTree, faCalendarDays, faUserInjured, faNewspaper, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import {
    emptyUserState,
    setLoggedInUser,
} from "../storage/redux/authSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toastNotify from '../helpers/toastNotify';
import { faUserNurse } from '@fortawesome/free-solid-svg-icons/faUserNurse';
import { RootState } from '../storage/redux/store';
import { SD_Roles } from '../utility/SD';
import User from '../models/User';

function SidePanel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData: User = useSelector(
        (state: RootState) => state.auth
    );
    
    const handleNavigation = (path: string) => () => navigate(path);
    const handleProfileNavigation = (role: string) => () => navigate(`/${role}/${userData.id}`);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        dispatch(setLoggedInUser({ ...emptyUserState }));
        navigate('/login');
        toastNotify('You have been logged out', 'success');
    };

    let sideBarComponents = [
        { icon: faUserInjured, label: 'Patients', onClick: handleNavigation('/patients') },
        { icon: faFolderTree, label: 'Departments', onClick: handleNavigation('/departments') },
        { icon: faCalendarDays, label: 'Appointments', onClick: handleNavigation('/appointments') },
        { icon: faBookMedical, label: 'Visits', onClick: handleNavigation('/visits') },
        { icon: faBedPulse, label: 'Rooms', onClick: handleNavigation('/rooms') },
        { icon: faSignOutAlt, label: 'Logout', onClick: handleLogout }
    ];

    if (userData.role === SD_Roles.ADMINISTRATOR) {
        sideBarComponents = [
            { icon: faUserDoctor, label: 'Doctors', onClick: handleNavigation('/doctors') },
            { icon: faUserNurse, label: 'Nurses', onClick: handleNavigation('/nurses') },
            ...sideBarComponents
        ];
    } else if (userData.role === SD_Roles.DOCTOR) {
        sideBarComponents = [
            { icon: faAddressCard, label: 'Profile', onClick: handleProfileNavigation('doctor') },
            { icon: faBookMedical, label: 'Visits', onClick: handleNavigation('/visits') },
            { icon: faNewspaper, label: 'News', onClick: handleNavigation('/news_chat') },
            { icon: faSignOutAlt, label: 'Logout', onClick: handleLogout }
        ];
    } else if (userData.role === SD_Roles.NURSE) {
        sideBarComponents = [
            { icon: faAddressCard, label: 'Profile', onClick: handleProfileNavigation('nurse') },
            { icon: faUserDoctor, label: 'Doctors', onClick: handleNavigation('/doctors') },
            { icon: faUserNurse, label: 'Nurses', onClick: handleNavigation('/nurses') },
            { icon: faUserInjured, label: 'Patients', onClick: handleNavigation('/patients') },
            { icon: faCalendarDays, label: 'Appointments', onClick: handleNavigation('/appointments') },
            { icon: faBedPulse, label: 'Rooms', onClick: handleNavigation('/rooms') },
            { icon: faNewspaper, label: 'News', onClick: handleNavigation('/news_chat') },
            { icon: faSignOutAlt, label: 'Logout', onClick: handleLogout }
        ];
    }

    return (
        <SidePanelContainer>
            {sideBarComponents.map((item, index) => (
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