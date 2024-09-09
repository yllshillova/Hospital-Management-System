using Domain.Contracts;
using Domain.Entities;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace Application.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly ConcurrentDictionary<string, string> _connections = new ConcurrentDictionary<string, string>();

        private readonly IChatMessageRepository _chatMessageRepository;

        public ChatHub(IChatMessageRepository chatMessageRepository)
        {
            _chatMessageRepository = chatMessageRepository;
        }

        public async Task SendMessage(string senderId, string receiverId, string content)
        {
            try
            {
                var chatMessage = new ChatMessage
                {
                    Id = Guid.NewGuid().ToString(),
                    SenderId = senderId,
                    ReceiverId = receiverId,
                    Content = content,
                    Timestamp = DateTime.UtcNow
                };

                await _chatMessageRepository.AddMessageAsync(chatMessage);
                Console.WriteLine($"Sending message to {receiverId}: {content}");

                if (_connections.TryGetValue(receiverId, out var connectionId))
                {
                    if (!string.IsNullOrEmpty(connectionId))
                    {
                        await Clients.Client(connectionId).SendAsync("ReceiveMessage", chatMessage);
                        Console.WriteLine($"Message sent to {receiverId} successfully.");
                    }
                    else
                    {
                        Console.WriteLine($"Connection ID for {receiverId} is null.");
                    }
                }
                else
                {
                    Console.WriteLine($"Receiver {receiverId} is not connected.");
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending message: {ex.Message}");
            }
        }


        public async Task<IEnumerable<ChatMessage>> GetMessages(string senderId, string receiverId)
        {
            try
            {
                var messages = await _chatMessageRepository.GetMessagesAsync(senderId, receiverId);
                return messages;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving messages: {ex.Message}");
                return Enumerable.Empty<ChatMessage>();
            }
        }



        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var userId = Context.GetHttpContext()?.Request.Query["id"].ToString();
            if (!string.IsNullOrEmpty(userId) && _connections.TryRemove(userId, out _))
            {
                Console.WriteLine($"User {userId} disconnected");
            }

            await base.OnDisconnectedAsync(exception);
        }
        // Optionally, you can add a method to handle user registration explicitly
        public void RegisterUser(string userId)
        {
            if (!string.IsNullOrEmpty(userId))
            {
                _connections[userId] = Context.ConnectionId;
                Console.WriteLine($"User {userId} registered with Connection ID: {Context.ConnectionId}");
            }
        }
    }
}
