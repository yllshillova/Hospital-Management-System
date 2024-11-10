import * as signalR from '@microsoft/signalr';
import ChatMessage from '../models/ChatMessage';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chatHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .withAutomaticReconnect([0, 2000, 10000, 30000]) 
    .configureLogging(signalR.LogLevel.Information)
    .build();


export async function startConnection(userId: string) {
    if (connection.state === signalR.HubConnectionState.Disconnected) {
        try {
            await connection.start();
            console.log("SignalR Connected.");
            await connection.invoke('RegisterUser', userId); // Register the user ID on the server

        } catch (err) {
            console.error("SignalR Connection Error: ", err);
            setTimeout(() => startConnection(userId), 5000); // Retry connection every 5 seconds
        }
    }
}

export function onReceiveMessage(callback: (chatMessage: ChatMessage) => void) {
    connection.on("ReceiveMessage", (chatMessage: ChatMessage) => {
        console.log('Received message:', chatMessage);
        callback(chatMessage);
    });
}

export async function loadMessages(senderId: string, receiverId: string): Promise<ChatMessage[]> {
    try {
        const loadedMessages = await connection.invoke("GetMessages", senderId, receiverId);
        return loadedMessages.map((message: ChatMessage) => ({
            ...message,
            alignment: message.senderId === senderId ? 'right' : 'left'
        }));
    } catch (err) {
        console.error("Error loading messages: ", err);
        throw new Error("Could not load messages."); // Throwing an error for better handling
    }
}



export async function sendMessage(senderId: string, receiverId: string, message: string) {
    try {
        console.log(`Sending message from sender: ${senderId} to receiver: ${receiverId} with content: ${message}`);
        await connection.invoke("SendMessage", senderId, receiverId, message);
    } catch (err) {
        console.error("Error sending message: ", err);
    }
}


export default connection;
