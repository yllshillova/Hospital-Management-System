import * as signalR from '@microsoft/signalr';
import toastNotify from '../helpers/toastNotify';
import { TypeOptions } from 'react-toastify';

// Initialize the SignalR connection for notifications
    const notificationsConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/notificationHub", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

    // Handle incoming notifications
    notificationsConnection.on("ReceiveNotification", (message: string, type: string) => {
        const toastType: TypeOptions = type as TypeOptions;
        toastNotify(message, toastType); // Display the notification using your custom function
    });


export async function startNotificationsConnection() {
    if (notificationsConnection.state === signalR.HubConnectionState.Disconnected) {
        try {
            await notificationsConnection.start();
            console.log("notificationsConnection SignalR Connected.");
        } catch (err) {
            console.error("notificationsConnection SignalR Connection Error: ", err);
            setTimeout(startNotificationsConnection, 5000); // Retry connection every 5 seconds
        }
    }
}

startNotificationsConnection();

export default notificationsConnection;