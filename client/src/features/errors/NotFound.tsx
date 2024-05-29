import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Header, SidePanel } from '../../app/layout';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <SidePanel />

            <NotFoundContainer>
                <NotFoundRow>
                    <NotFoundCol>
                        <TitleRow>
                            <NotFoundIcon icon={faLock} />
                            <NotFoundTitle>Access Denied</NotFoundTitle>
                        </TitleRow>
                        <NotFoundMessage>
                            You do not have permission to access this page
                        </NotFoundMessage>
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    </NotFoundCol>
                </NotFoundRow>
            </NotFoundContainer>
        </>
    );
};

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 10px;
    padding: 15px;
    max-width: 500px;
    margin: 80px 265px 0 auto;
`;

const NotFoundRow = styled.div`
    text-align: center;
`;

const NotFoundCol = styled.div``;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom:-5px;
`;

const NotFoundIcon = styled(FontAwesomeIcon)`
    font-size: 30px;
    color: #dc3545;
    margin-right: 10px;
    animation: fadeIn 3s ease, bounce 3s infinite;

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-5px);
        }
        60% {
            transform: translateY(-2px);
        }
    }
`;

const NotFoundTitle = styled.h1`
    font-size: 20px;
    font-weight: bold;
`;

const NotFoundMessage = styled.p`
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
    max-width: 450px;
`;

const BackButton = styled.button`
    background-color: #721c24;
    color: #f8d7da;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #5a1720;
        transform: scale(1.05);
    }
};
`;
export default NotFound;