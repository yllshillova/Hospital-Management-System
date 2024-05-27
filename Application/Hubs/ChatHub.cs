using Domain.Entities;
using Microsoft.AspNetCore.SignalR;

namespace Application.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IChatMessageRepository _chatMessageRepository;

        public ChatHub(IChatMessageRepository chatMessageRepository)
        {
            _chatMessageRepository = chatMessageRepository;
        }

        public async Task SendMessage(string senderId, string receiverId, string content)
        {
            var chatMessage = new ChatMessage
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                Content = content,
                Timestamp = DateTime.UtcNow
            };

            await _chatMessageRepository.AddMessageAsync(chatMessage);

            // Send the message to the receiver
            await Clients.User(receiverId).SendAsync("ReceiveMessage", senderId, content);
        }

        public async Task GetMessages(string userId)
        {
            var messages = await _chatMessageRepository.GetMessagesAsync(userId);
            await Clients.User(userId).SendAsync("LoadMessages", messages);
        }
    }
}
