using Microsoft.AspNetCore.SignalR;

public class NotificationHub : Hub
{
    // Method to send notification to all clients
    public async Task SendNotification(string message, string type)
    {
        await Clients.All.SendAsync("ReceiveNotification", message, type);
    }
}
