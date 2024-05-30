import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { ChatBoxContainer, ChatHeader, ChatInput, ChatInputContainer, ChatMessages, CloseButton, MessageNotFound, SendButton } from '../../../app/common/styledComponents/chat';
import { loadMessages, onLoadMessages, onReceiveMessage, sendMessage, startConnection } from '../../../app/utility/signalrService';
import ChatMessage from '../../../app/models/ChatMessage';
import { RootState } from '../../../app/storage/redux/store';
import User from '../../../app/models/User';

interface ChatBoxProps {
    selectedUser: User | null;
    setSelectedUser: (user: User | null) => void;
}

function ChatBox({ selectedUser, setSelectedUser }: ChatBoxProps) {
    const [messages, setMessages] = useState<{ [key: string]: ChatMessage[] }>({});
    const [message, setMessage] = useState<string>('');
    const senderId: string = useSelector((state: RootState) => state.auth.id);

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
                    const loadedMessages = await loadMessages(senderId, selectedUser.id);
                    if (loadedMessages) {
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

    const handleSendMessage = () => {
        if (message.trim() && selectedUser) {
            setMessages(prevMessages => {
                const userMessages = prevMessages[selectedUser.id] || [];
                return {
                    ...prevMessages,
                    [selectedUser.id]: [...userMessages, { id: "", senderId, receiverId: selectedUser.id, content: message, alignment: 'right' }]
                };
            });

            sendMessage(senderId, selectedUser.id, message);
            setMessage('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    if (!selectedUser) {
        return null;
    }

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
                        <Message key={index} alignment={msg.alignment}>
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
