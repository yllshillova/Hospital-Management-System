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

// Reconnect on close
//connection.onclose(async () => {
//    console.log("Connection closed, attempting to reconnect...");
//    await startConnection();
//});

// Function to set up receiving messages
//export function onReceiveMessage(callback: (messageId: string, senderId: string, receiverId: string, content: string) => void) {
//    connection.on("ReceiveMessage", (messageId, senderId, receiverId, content) => {
//        console.log(`Received message: { id: ${messageId}, sender: ${senderId}, receiver: ${receiverId}, content: ${content} }`);
//        callback(messageId, senderId, receiverId, content);
//    });
//}

// Function to set up receiving messages
// Set up the message listener
//export function onReceiveMessage(callback: (message: ChatMessage) => void) {
//    console.log("Setting up ReceiveMessage listener"); // Debugging log
//    connection.on("ReceiveMessage", (messageId, senderId, receiverId, content) => {
//        console.log(`Received message: { id: ${messageId}, sender: ${senderId}, receiver: ${receiverId}, content: ${content} }`);
//        const message: ChatMessage = {
//            id: messageId,
//            senderId,
//            receiverId,
//            content,
//            alignment: receiverId === senderId ? 'left' : 'right'
//        };
//        callback(message);
//    });
//}
export function onReceiveMessage(callback: (chatMessage: ChatMessage) => void) {
    connection.on("ReceiveMessage", (chatMessage: ChatMessage) => {
        console.log('Received message:', chatMessage);
        callback(chatMessage);
    });
}




// Function to load messages for a user when a chat is opened
//export async function loadMessages(senderId: string, receiverId: string) {
//    try {
//        //console.log("Loading messages for sender:", senderId, "and receiver:", receiverId);
//        const loadedMessages = await connection.invoke("GetMessages", senderId, receiverId);
//        //console.log("Loaded messages:", loadedMessages);

//        if (loadedMessages === null || loadedMessages.length === 0) {
//            //console.log("No messages found for the selected users.");
//            return []; // Return an empty array if no messages are found
//        }

//        return loadedMessages.map((message: ChatMessage) => ({
//            id: message.id,
//            senderId: message.senderId,
//            receiverId: message.receiverId,
//            content: message.content,
//            alignment: message.senderId === senderId ? 'right' : 'left'
//        }));
//    } catch (err) {
//        //console.error("Error loading messages: ", err);
//        return []; // Return an empty array in case of error
//    }
//}

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
