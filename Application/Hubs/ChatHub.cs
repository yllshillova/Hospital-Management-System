using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace Application.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly ConcurrentDictionary<string, string> _connections = new ConcurrentDictionary<string, string>();

        public override async Task OnConnectedAsync()
        {
            var userId = Context.UserIdentifier;
            if (userId != null)
            {
                _connections[userId] = Context.ConnectionId;
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var userId = Context.UserIdentifier;
            if (userId != null)
            {
                _connections.TryRemove(userId, out _);
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string userId, string message)
        {
            if (_connections.TryGetValue(userId, out var connectionId))
            {
                await Clients.Client(connectionId).SendAsync("ReceiveMessage", Context.UserIdentifier, message);
            }
        }
    }
}
