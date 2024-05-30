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
                Id = Guid.NewGuid().ToString(),
                SenderId = senderId,
                ReceiverId = receiverId,
                Content = content,
                Timestamp = DateTime.UtcNow
            };

            await _chatMessageRepository.AddMessageAsync(chatMessage);

            // Send the message to the receiver
            await Clients.User(receiverId).SendAsync("ReceiveMessage", chatMessage.Id, chatMessage.SenderId, chatMessage.ReceiverId, chatMessage.Content);
        }

        public async Task<IEnumerable<ChatMessage>> GetMessages(string senderId, string receiverId)
        {
            var messages = await _chatMessageRepository.GetMessagesAsync(senderId, receiverId);
            return messages;
        }

    }
}
