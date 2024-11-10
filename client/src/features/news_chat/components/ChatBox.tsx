import React, { useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBoxContainer, ChatHeader, ChatInput, ChatInputContainer, ChatMessages, CloseButton, MessageNotFound, SendButton } from '../../../app/common/styledComponents/chat';
import  connection, { loadMessages,  onReceiveMessage,  sendMessage, startConnection } from '../../../app/utility/signalrService';
import ChatMessage from '../../../app/models/ChatMessage';
import { RootState } from '../../../app/storage/redux/store';
import User from '../../../app/models/User';
import { addMessage , loadMessages as loadMessagesAction} from '../../../app/storage/redux/chatSlice';
import * as signalR from '@microsoft/signalr';

interface ChatBoxProps {
    selectedUser: User | null;
    setSelectedUser: (user: User | null) => void;
}

function ChatBox({ selectedUser, setSelectedUser }: ChatBoxProps) {
    const [message, setMessage] = useState<string>('');
    const senderId: string = useSelector((state: RootState) => state.auth.id);
    const messages = useSelector((state: RootState) => state.chat.messages);
    const dispatch = useDispatch();

    // Reference to the latest message element
    const latestMessageRef = useRef<HTMLDivElement | null>(null);


     //Fetch and load messages
    const fetchMessages = useCallback(async () => {
        if (selectedUser) {
            try {
                const loadedMessages = await loadMessages(senderId, selectedUser.id);
                dispatch(loadMessagesAction({ chatId: selectedUser.id, messages: loadedMessages }));
            } catch (error) {
                console.error('Error loading messages:', error);
            }
        }
    }, [dispatch, selectedUser, senderId]);

    useEffect(() => {
        const initializeChat = async () => {
            try {
                await startConnection(senderId);
                fetchMessages(); // Fetch messages after connection

                if (connection.state === signalR.HubConnectionState.Connected) {
                    onReceiveMessage((chatMessage: ChatMessage) => {
                        console.log('Received message:', chatMessage);
                        const { senderId: msgSenderId, receiverId: msgReceiverId } = chatMessage;
                        const chatId = msgSenderId === senderId ? msgReceiverId : msgSenderId;

                        dispatch(addMessage({ chatId, message: chatMessage }));

                        
                    });
                } else {
                    console.error('SignalR connection not established.');
                }

            } catch (error) {
                console.error('Error initializing chat:', error);
            }
        };

        initializeChat();

        // Clean up on unmount
        return () => {
            connection.off("ReceiveMessage");
        };
    }, [fetchMessages, dispatch, senderId, selectedUser]);

    
    const handleSendMessage = () => {
        if (message.trim() && selectedUser) {
            const newMessage: ChatMessage = {
                id: "", // You can set this to a unique ID if needed
                senderId,
                receiverId: selectedUser.id,
                content: message,
                alignment: 'right',
            };

            dispatch(addMessage({ chatId: selectedUser.id, message: newMessage })); // Dispatch action to add message
            console.log(`Connection state before sending: ${connection.state}`);
            console.log('Sending message:', newMessage); // Debugging log

            sendMessage(senderId, selectedUser.id, message);
            setMessage('');
        }
    };

    // Effect to scroll to the latest message
    useEffect(() => {
        if (latestMessageRef.current) {
            latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, selectedUser]); // Run whenever messages or selectedUser change

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    if (!selectedUser) return null;


    

    

    return (
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
                    <MessageNotFound>
                        Start your chat with {selectedUser.name} {selectedUser.lastName}!
                    </MessageNotFound>
                ) : (
                    messages[selectedUser.id]?.map((msg: ChatMessage, index: number) => (
                        <Message
                            key={index}
                            alignment={msg.alignment}
                            ref={index === messages[selectedUser.id].length - 1 ? latestMessageRef : null} // Reference the last message

                        >
                            {msg.content}
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
    );
}


const Message = styled.div<{ alignment: 'left' | 'right' }>`
    margin: 5px 0;
    padding: 8px 12px;
    background-color: ${props => props.alignment === 'right' ? '#F0F8FF' : '#f5f5f5'};
    border-radius: ${props => props.alignment === 'right' ? '15px 15px 0 15px' : '15px 15px 15px 0'};
    max-width: 50%;
    align-self: ${props => props.alignment === 'right' ? 'flex-end' : 'flex-start'};
    font-size: 14px;
    line-height: 1.4;
    word-wrap: break-word;
    word-break: break-word;
    text-align: ${props => props.alignment === 'right' ? 'right' : 'left'};
    margin-left: ${props => props.alignment === 'right' ? 'auto' : '0'};
    margin-right: ${props => props.alignment === 'right' ? '0' : 'auto'};
`;

export default ChatBox;