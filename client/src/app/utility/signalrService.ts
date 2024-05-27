import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chatHub")
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

export async function startConnection() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log("Error while starting connection: ", err);
        setTimeout(startConnection, 5000);
    }
}

// Reconnect on close
connection.onclose(async () => {
    await startConnection();
});

// Function to set up receiving messages
export function onReceiveMessage(callback: (user: string, message: string) => void) {
    connection.on("ReceiveMessage", callback);
}

// Function to load messages for a user when a chat is opened
export async function loadMessages(userId: string) {
    try {
        // Invoke the 'GetMessages' method on the server to retrieve messages for the user
        const messages = await connection.invoke("GetMessages", userId);
        // Handle received messages (if needed)
        console.log("Received messages:", messages);
    } catch (err) {
        console.error("Error loading messages: ", err);
    }
}

export async function sendMessage(senderId: string, receiverId: string, message: string) {
    try {
        await connection.invoke("SendMessage", senderId, receiverId, message);
    } catch (err) {
        console.error("Error sending message: ", err);
    }
}

// Initialize the connection
startConnection();

export default connection;
