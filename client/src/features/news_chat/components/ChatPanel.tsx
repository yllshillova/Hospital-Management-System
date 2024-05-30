import { useState } from 'react';
import { Header, SidePanel } from '../../../app/layout';
import User from '../../../app/models/User';
import { ChatBoxContainer, UserListContainer } from '../../../app/common/styledComponents/chat';
import UserList from './UserList';
import ChatBox from './ChatBox';

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
