namespace Domain.Entities
{
    public interface IChatMessageRepository
    {
        Task<IEnumerable<ChatMessage>> GetMessagesAsync(string userId);
        Task AddMessageAsync(ChatMessage message);
    }
}
