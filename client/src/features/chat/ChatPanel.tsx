import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Header, SidePanel } from '../../app/layout';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetStaffQuery } from '../../app/APIs/accountApi';
import MainLoader from '../../app/common/MainLoader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useLocation, useNavigate } from 'react-router-dom';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { startConnection, sendMessage, onReceiveMessage, loadMessages, onLoadMessages } from '../../app/utility/signalrService';
import User from '../../app/models/User';
import { RootState } from '../../app/storage/redux/store';
import { setSearchTerm } from '../../app/storage/redux/searchSlice';
import { useGetDoctorsQuery } from '../../app/APIs/doctorApi';
import { useGetNursesQuery } from '../../app/APIs/nurseApi';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import Doctor from '../../app/models/Doctor';
import Nurse from '../../app/models/Nurse';
import { faUserNurse } from '@fortawesome/free-solid-svg-icons/faUserNurse';
import ChatMessage from '../../app/models/ChatMessage';

function ChatPanel() {

    const { data: users, isLoading, error, isError } = useGetStaffQuery(null);
    const { data: doctors, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(null);
    const { data: nurses, isLoading: nursesLoading, error: nursesError } = useGetNursesQuery(null);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
    const [userNotFound, setUserNotFound] = useState(false);

    const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
    const senderId: string = useSelector((state: RootState) => state.auth.id);

    const [messages, setMessages] = useState<{ [key: string]: ChatMessage[] }>({});
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (users) {
            setDisplayedUsers(users);
        }
    }, [users]);

    useEffect(() => {
        startConnection();
        onReceiveMessage((messageId, senderId, receiverId, content) => {
            setMessages(prevMessages => {
                const userMessages = prevMessages[receiverId] || [];
                return {
                    ...prevMessages,
                    [receiverId]: [...userMessages, { id: messageId, senderId, receiverId, content, alignment: senderId === senderId ? 'right' : 'left' }]
                };
            });
        });

        onLoadMessages((loadedMessages: ChatMessage[]) => {
            if (selectedUser) {
                setMessages(prevMessages => {
                    const updatedMessages: ChatMessage[] = loadedMessages.map((msg: ChatMessage) => ({
                        ...msg,
                        alignment: msg.senderId === senderId ? 'right' : 'left'
                    }));
                    return {
                        ...prevMessages,
                        [selectedUser.id]: updatedMessages
                    };
                });
            }
        });
    }, [selectedUser, senderId]);


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (selectedUser) {
                    console.log("Fetching messages for sender:", senderId, "and receiver:", selectedUser.id);
                    const loadedMessages = await loadMessages(senderId, selectedUser.id);
                    console.log("Loaded messages:", loadedMessages);
                    if (loadedMessages) {
                        console.log("Updating messages state...");
                        setMessages(prevMessages => ({
                            ...prevMessages,
                            [selectedUser.id]: loadedMessages.map((message: ChatMessage) => ({
                                id: message.id,
                                senderId: message.senderId,
                                receiverId: message.receiverId,
                                content: message.content,
                                alignment: message.senderId === senderId ? 'right' : 'left'
                            }))
                        }));
                    }
                }
            } catch (err) {
                console.error("Error fetching messages: ", err);
            }
        };

        fetchMessages();
    }, [selectedUser, senderId]);




    if (isLoading || doctorsLoading || nursesLoading) return <MainLoader />;

    if (isError || doctorsError || nursesError) {
        const fbError = error as FetchBaseQueryError;
        const fbDoctorsError = doctorsError as FetchBaseQueryError;
        const fbNursesError = nursesError as FetchBaseQueryError;
        useErrorHandler(fbError || fbDoctorsError || fbNursesError, navigate, location.pathname);
        return <div>Error loading data</div>;
    }

    const handleUserItemClick = async (user: User) => {
        setSelectedUser(user);
    };

    const handleSendMessage = () => {
        if (message.trim() && selectedUser) {
            const key = `${senderId}-${selectedUser.id}`;
            setMessages(prevMessages => {
                const userMessages = prevMessages[key] || [];
                return {
                    ...prevMessages,
                    [key]: [...userMessages, { id: "", senderId, receiverId: selectedUser.id, content: message, alignment: 'right' }]
                };
            });

            sendMessage(senderId, selectedUser.id, message);
            setMessage('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        dispatch(setSearchTerm(searchTerm));
    };

    useEffect(() => {
        if (users) {
            if (searchTerm === '') {
                setDisplayedUsers(users);
                setUserNotFound(false);
            } else {
                const results = users.filter((user: User) =>
                    `${user.name} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setDisplayedUsers(results);
                setUserNotFound(results.length === 0);
            }
        }
    }, [searchTerm, users]);

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
                    {searchTerm && (
                        <CancelButton
                            onClick={() => {
                                dispatch(setSearchTerm(''));
                            }}
                        >
                            Cancel
                        </CancelButton>
                    )}
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
                            <UserName>
                                {isDoctor && "Dr. "}
                                {isNurse && !isDoctor && "Nurse. "}
                                {user.name} {user.lastName}
                            </UserName>
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
                        {messages[selectedUser.id]?.length === 0 ? (
                            <div>No messages found</div>
                        ) : (
                                messages[selectedUser.id]?.map((msg: ChatMessage, index: number) => (
                                <Message key={index} alignment={msg.alignment}>
                                    <Sender>{msg.senderId}:</Sender> {msg.content}
                                </Message>
                            ))
                        )}
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
}

const UserListContainer = styled.div`
    position: fixed;
    top: 48px;
    right: 0;
    bottom: 0;
    background-color: white;
    min-width: 300px;
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
    right: 300px;
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
    height: 25px; 

    ::placeholder {
        font-weight: bold;
    }
`;


const CancelButton = styled.button`
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
