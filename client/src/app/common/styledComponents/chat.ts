// components/ChatPanel/styles.js
import styled from 'styled-components';

export const UserListContainer = styled.div`
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

export const UserItem = styled.div`
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

export const UserIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #002147;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

  svg {
    color: white;
    font-size: 18px;
  }
`;

export const UserName = styled.div`
  font-size: 13.5px;
  font-weight: bold;
  color: black;
`;

export const UserNotFoundMessage = styled.p`
  margin: 10px;
  padding: 10px;
  color: crimson;
  font-size: 13.5px;
  font-weight: bold;
  border-radius: 5px;
`;

export const ChatBoxContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 300px;
  width: 300px;
  height: 350px;
  max-height: 80vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const ChatHeader = styled.div`
  color: black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #002147;
  font-size: 17px;
  cursor: pointer;
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 400px;
  word-break: break-word;
  overflow-wrap: break-word;
  border-top: 1px solid #ddd;
`;


export const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const SendButton = styled.button`
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

export const SearchContainer = styled.div`
  display: flex;
  padding: 10px 15px;
`;

export const SearchInput = styled.input`
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

export const MessageNotFound = styled.div`
  font-size: 13.5px;
  border-radius: 5px;
  background-color: #F0F8FF;
  padding: 10px;
`;

export const CancelButton = styled.button`
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