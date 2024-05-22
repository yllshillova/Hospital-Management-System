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

interface User {
    id: string;
    name: string;
    lastName: string;
}

interface Message {
    sender: string;
    content: string;
    alignment: 'left' | 'right';
}


function ChatPanel() {

    const { data: users, isLoading, error , isError } = useGetStaffQuery(null);

    const navigate = useNavigate();
    const location = useLocation();

    const fbError = error as FetchBaseQueryError;
    if (isError ) {
        useErrorHandler(fbError, navigate, location.pathname);
    }
    if (isLoading) return <MainLoader />;

    const [selectedUser, setSelectedUser] = useState<User | null>(null); // State to store the selected user

    const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
    const [message, setMessage] = useState<string>('');

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
                    [user]: [...userMessages, { sender: user, content: message, alignment: 'right' }]
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
                    [selectedUser.id]: [...userMessages, { sender: 'Me', content: message, alignment: 'left' }]
                };
            });
            sendMessage(selectedUser.id, message);
            setMessage('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    return (
        <>
            <Header />
            <SidePanel />

            <UserListContainer>
                <Title>Staff</Title>
                {users?.map((user : User) => (
                    <UserItem key={user.id} onClick={() => handleUserItemClick(user)}>
                        <UserIcon>
                            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png" alt={`${user.name} icon`} />
                        </UserIcon>
                        <UserName>{user.name} {" "} {user.lastName}</UserName>
                    </UserItem>
                ))}
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
    padding: 10px 12px;
    margin: 5px 5%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #F0F8FF;
        border-radius: 8px;
    }
`;

const UserIcon = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const UserName = styled.div`
    font-size: 13.5px;
    font-weight: bold;
    color: #899499;
`;

const Title = styled.p`
    margin: 0 40px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 3px;
`;

const ChatBoxContainer = styled.div`
    position: fixed;
    bottom: 0;
    right: 202px;
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
    overflow-x: hidden; /* Prevent horizontal scrolling */
    max-height: 400px; /* Set a maximum height for the chat messages */
    word-break: break-word; /* Break long words to prevent overflow */
    overflow-wrap: break-word; /* Ensure long words break within the container */
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
`;

export default ChatPanel;
