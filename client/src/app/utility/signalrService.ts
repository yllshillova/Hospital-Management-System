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

export async function sendMessage(userId: string, message: string) {
    try {
        await connection.invoke("SendMessage", userId, message);
    } catch (err) {
        console.error("Error sending message: ", err);
    }
}

// Initialize the connection
startConnection();

export default connection;
