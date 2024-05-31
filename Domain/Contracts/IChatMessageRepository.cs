using Domain.Entities;

namespace Domain.Contracts
{
    public interface IChatMessageRepository
    {
        Task<IEnumerable<ChatMessage>> GetMessagesAsync(string currentUserId, string selectedUserId);
        Task AddMessageAsync(ChatMessage message);
    }
}
