import * as signalR from '@microsoft/signalr';
import ChatMessage from '../models/ChatMessage';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chatHub")
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

export async function startConnection() {
    try {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
            await connection.start();
           // console.log("SignalR Connected.");
        } else {
            //console.log("SignalR connection is not in the Disconnected state. Current state:", connection.state);
        }
    } catch (err) {
        //console.log("Error while starting connection: ", err);
        setTimeout(startConnection, 5000);
    }
}

// Reconnect on close
connection.onclose(async () => {
    //console.log("Connection closed, attempting to reconnect...");
    await startConnection();
});

// Function to set up receiving messages
export function onReceiveMessage(callback: (messageId: string, senderId: string, receiverId: string, content: string) => void) {
    connection.on("ReceiveMessage", (messageId, senderId, receiverId, content) => {
        //console.log(`Received message: { id: ${messageId}, sender: ${senderId}, receiver: ${receiverId}, content: ${content} }`);
        callback(messageId, senderId, receiverId, content);
    });
}

export function onLoadMessages(callback: (messages: ChatMessage[]) => void) {
    connection.on("LoadMessages", (messages) => {
        //console.log("Loaded messages: ", messages);
        callback(messages);
    });
}

// Function to load messages for a user when a chat is opened
export async function loadMessages(senderId: string, receiverId: string) {
    try {
        //console.log("Loading messages for sender:", senderId, "and receiver:", receiverId);
        const loadedMessages = await connection.invoke("GetMessages", senderId, receiverId);
        //console.log("Loaded messages:", loadedMessages);

        if (loadedMessages === null || loadedMessages.length === 0) {
            //console.log("No messages found for the selected users.");
            return []; // Return an empty array if no messages are found
        }

        return loadedMessages.map((message: ChatMessage) => ({
            id: message.id,
            senderId: message.senderId,
            receiverId: message.receiverId,
            content: message.content,
            alignment: message.senderId === senderId ? 'right' : 'left'
        }));
    } catch (err) {
        //console.error("Error loading messages: ", err);
        return []; // Return an empty array in case of error
    }
}




export async function sendMessage(senderId: string, receiverId: string, message: string) {
    try {
        //console.log(`Sending message from sender: ${senderId} to receiver: ${receiverId} with content: ${message}`);
        await connection.invoke("SendMessage", senderId, receiverId, message);
    } catch (err) {
        //console.error("Error sending message: ", err);
    }
}

// Initialize the connection
startConnection();

export default connection;
