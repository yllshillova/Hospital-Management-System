import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Header, SidePanel } from '../../app/layout';

const NotFound = () => {
    return (
        <>
            <Header />
            <SidePanel />

            <NotFoundContainer>
                <NotFoundRow>
                    <NotFoundCol>
                        <NotFoundIcon icon={faLock} />
                        <NotFoundTitle>Access Denied</NotFoundTitle>
                        <NotFoundMessage>
                            You do not have permission to access this page.
                        </NotFoundMessage>
                        
                    </NotFoundCol>
                </NotFoundRow>
            </NotFoundContainer>
        </>
    );
};

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin: -50px 0 0 150px;
`;

const NotFoundRow = styled.div`
  text-align: center;
`;

const NotFoundCol = styled.div``;

const NotFoundIcon = styled(FontAwesomeIcon)`
  font-size: 48px;
  color: #dc3545;
  margin-bottom: 20px;
`;

const NotFoundTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const NotFoundMessage = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
  max-width: 500px;
`;

const NotFoundButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #337ab7;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #23527c;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default NotFound;