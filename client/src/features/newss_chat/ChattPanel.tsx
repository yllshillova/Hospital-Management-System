import { useState } from 'react';
import { Header, SidePanel } from '../../app/layout';
import UserList from './UserList';
import ChatBox from '../news_chat/ChatBox';
import User from '../../app/models/User';
import { ChatBoxContainer, UserListContainer } from './chat';

function ChattPanel() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <>
            <Header />
            <SidePanel />

            <UserListContainer>
                <UserList setSelectedUser={setSelectedUser} />
            </UserListContainer>

            {selectedUser && (
                <ChatBoxContainer>
                    <ChatBox selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                </ChatBoxContainer>
            )}
        </>
    );
}

export default ChattPanel;
