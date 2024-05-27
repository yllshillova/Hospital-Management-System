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

        public async Task<IEnumerable<ChatMessage>> GetMessagesAsync(string userId)
        {
            return await _chatMessages.Find(m => m.SenderId == userId || m.ReceiverId == userId).ToListAsync();
        }

        public async Task AddMessageAsync(ChatMessage message)
        {
            await _chatMessages.InsertOneAsync(message);
        }
    }
}