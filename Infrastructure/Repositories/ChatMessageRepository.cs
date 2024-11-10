using Domain.Contracts;
using Domain.Entities;
using MongoDB.Driver;

namespace Infrastructure.Repositories
{
    public class ChatMessageRepository : IChatMessageRepository
    {
        private readonly IMongoCollection<ChatMessage> _chatMessages;

        public ChatMessageRepository(MongoContext context)
        {
            _chatMessages = context.ChatMessages;
        }

        public async Task<IEnumerable<ChatMessage>> GetMessagesAsync(string senderId, string receiverId)
        {
            var messages = await _chatMessages
                .Find(m => (m.SenderId == senderId && m.ReceiverId == receiverId) || (m.SenderId == receiverId && m.ReceiverId == senderId))
                .ToListAsync();
            return messages;
        }


        public async Task AddMessageAsync(ChatMessage message)
        {
            await _chatMessages.InsertOneAsync(message);
        }
    }
}