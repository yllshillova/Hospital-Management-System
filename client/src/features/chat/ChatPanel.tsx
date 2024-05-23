import styled from 'styled-components';
import { useEffect, useState } from 'react'; // Import useState hook
import { Header, SidePanel } from '../../app/layout';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetStaffQuery } from '../../app/APIs/accountApi';
import MainLoader from '../../app/common/MainLoader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useLocation, useNavigate } from 'react-router-dom';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { onReceiveMessage, sendMessage } from '../../app/utility/signalrService';
import User from '../../app/models/User';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/storage/redux/store';
import { setSearchTerm } from '../../app/storage/redux/searchSlice';
import { useGetDoctorsQuery } from '../../app/APIs/doctorApi';
import { useGetNursesQuery } from '../../app/APIs/nurseApi';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import Doctor from '../../app/models/Doctor';
import Nurse from '../../app/models/Nurse';
import { faUserNurse } from '@fortawesome/free-solid-svg-icons/faUserNurse';

interface Message {
    sender: string;
    content: string;
    alignment: 'left' | 'right';
}


function ChatPanel() {

    const { data: users, isLoading, error , isError } = useGetStaffQuery(null);
    const { data: doctors, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(null);
    const { data: nurses, isLoading: nursesLoading, error: nursesError } = useGetNursesQuery(null);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    

    const [selectedUser, setSelectedUser] = useState<User | null>(null); // State to store the selected user
    const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
    const [userNotFound, setUserNotFound] = useState(false);

    const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

    const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (users) {
            setDisplayedUsers(users);
        }
    }, [users]);

    
    if (isLoading || doctorsLoading || nursesLoading) return <MainLoader />;

    if (isError || doctorsError || nursesError) {
        const fbError = error as FetchBaseQueryError;
        const fbDoctorsError = doctorsError as FetchBaseQueryError;
        const fbNursesError = nursesError as FetchBaseQueryError;
        useErrorHandler(fbError || fbDoctorsError || fbNursesError, navigate, location.pathname);
        return <div>Error loading data</div>;
    }

    // Function to handle user item click
    const handleUserItemClick = (user: User) => {
        setSelectedUser(user);
    };

    useEffect(() => {
        onReceiveMessage((user: string, message: string) => {
            setMessages(prevMessages => {
                const userMessages = prevMessages[user] || [];
                return {
                    ...prevMessages,
                    [user]: [...userMessages, { sender: user, content: message, alignment: 'left' }]
                };
            });
        });
    }, []);

    const handleSendMessage = () => {
        if (message.trim() && selectedUser) {
            setMessages(prevMessages => {
                const userMessages = prevMessages[selectedUser.id] || [];
                return {
                    ...prevMessages,
                    [selectedUser.id]: [...userMessages, { sender: 'Me', content: message, alignment: 'right' }]
                };
            });
            sendMessage(selectedUser.id, message);
            setMessage('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    

    const handleSearchClick = () => {
        if (users) {
            if (searchTerm === '') {
                setDisplayedUsers(users);
                setUserNotFound(false); // Reset user not found state
            } else {
                const results = users.filter((user: User) =>
                    `${user.name} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setDisplayedUsers(results);
                setUserNotFound(results.length === 0); // Set user not found state based on search results
            }
        }
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        dispatch(setSearchTerm(searchTerm));
    };

    return (
        <>
            <Header />
            <SidePanel />

            <UserListContainer>
                <SearchContainer>
                    <SearchInput
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search staff"
                    />
                    <SearchButton onClick={handleSearchClick}>Search</SearchButton>
                </SearchContainer>
                {displayedUsers.map((user: User) => {
                    const isDoctor = doctors.some((doctor: Doctor) => doctor.id === user.id);
                    const isNurse = nurses.some((nurse: Nurse) => nurse.id === user.id);
                    return (
                        <UserItem key={user.id} onClick={() => handleUserItemClick(user)}>
                            <UserIcon>
                                {isDoctor && <FontAwesomeIcon icon={faUserDoctor} />}
                                {isNurse && !isDoctor && <FontAwesomeIcon icon={faUserNurse} />}
                            </UserIcon>
                            <UserName>{user.name} {user.lastName}</UserName>
                        </UserItem>
                    );
                })}
            {userNotFound && <UserNotFoundMessage>User not found</UserNotFoundMessage>}

            </UserListContainer>


            {selectedUser && (
                <ChatBoxContainer>
                    <ChatHeader>
                        <span style={{ color: "black", fontSize: "13.5px", fontWeight: "bold" }}>
                            {`${selectedUser.name} ${selectedUser.lastName}`}
                        </span>
                        <CloseButton onClick={() => setSelectedUser(null)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </CloseButton>
                    </ChatHeader>
                    <ChatMessages>
                        {(messages[selectedUser.id] || []).map((msg, index) => (
                            <Message key={index} alignment={msg.alignment}>
                                <Sender>{msg.sender}:</Sender> {msg.content}
                            </Message>
                        ))}
                    </ChatMessages>
                    <ChatInputContainer>
                        <ChatInput
                            name="message"
                            placeholder="Type a message..."
                            value={message}
                            onChange={handleInputChange}
                        />
                        <SendButton onClick={handleSendMessage}>Send</SendButton>
                    </ChatInputContainer>
                </ChatBoxContainer>
            )}
        </>
    );
};


const UserListContainer = styled.div`
    position: fixed;
    top: 48px;
    right: 0;
    bottom: 0;
    background-color: white;
    min-width: 200px;
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

const UserItem = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 8px;
    margin: 5px 5%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #F0F8FF;
        border-radius: 8px;
    }
`;

const UserIcon = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color:#002147;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;

    svg {
        color: white; /* Red icon */
        font-size: 18px;
    }
`;

const UserName = styled.div`
    font-size: 13.5px;
    font-weight: bold;
    color: black;
`;

const UserNotFoundMessage = styled.p`
    margin: 10px;
    padding: 10px;
    color: crimson;
    font-size: 13.5px;
    font-weight: bold;
    border-radius: 5px;
`;

const ChatBoxContainer = styled.div`
    position: fixed;
    bottom: 0;
    right: 307px;
    width: 300px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const ChatHeader = styled.div`
    color: black;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d3d3d3;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: #002147;
    font-size: 17px;
    cursor: pointer;
`;

const ChatMessages = styled.div`
    flex: 1;
    padding: 10px;t
    overflow-y: auto;
    overflow-x: hidden; 
    max-height: 400px; 
    word-break: break-word;
    overflow-wrap: break-word; 
`;
const Message = styled.div<{ alignment: 'left' | 'right' }>`
    margin: 5px 0;
    text-align: ${props => props.alignment};
    font-size:13.5px;
`;
const Sender = styled.span`
    font-weight: bold;
`;
const ChatInputContainer = styled.div`
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const SendButton = styled.button`
    background-color:#002147;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
    transition: ease 0.3s;
    &:hover {
        transform: scale(1.1);
    }
`;
const SearchContainer = styled.div`
    display: flex;
    padding: 10px 15px;
    `;

const SearchInput = styled.input`
    flex: 1;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 13.5px;
    ::placeholder {
        font-weight: bold;
    }

`;


const SearchButton = styled.button`
    background-color: #002147;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
    transition: ease 0.3s;
    &:hover {
        transform: scale(1.1);
    }
`;
export default ChatPanel;
