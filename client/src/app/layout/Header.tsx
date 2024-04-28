//import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-solid-svg-icons/faHospital';
import { useNavigate } from 'react-router-dom';
//import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
//import { userModel } from '../../Interfaces';
//import { useSelector } from 'react-redux';
//import { RootState } from '../../Storage/Redux/store';

function Header() {
    const navigate = useNavigate();
    //const userData: userModel = useSelector(
    //    (state: RootState) => state.userAuthStore
    //);

    //const nameUser = userData.name;
    //const surnameUser = userData.surname;

    return (
        <StickyHeader>
            <HeaderContainer>
                <LogoContainer>
                    <Logo onClick={() => navigate('/')} >Dashboard</Logo>
                    <MenuIcon icon={faHospital} />
                </LogoContainer>
                {/*<MessageContainer> {nameUser} {" "} {surnameUser}*/}
                <MessageContainer> {"Name Surname"}
                    <UserImage>
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                            alt="dp"
                        />
                    </UserImage>
                </MessageContainer>
            </HeaderContainer>
        </StickyHeader>
    );
}

const StickyHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1a252e;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 768px) {
        padding: 10px;
    }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;

const MenuIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
  color: #FF003F;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  cursor: pointer;
`;

const UserImage = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export default Header;