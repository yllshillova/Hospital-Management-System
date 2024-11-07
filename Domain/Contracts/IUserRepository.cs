using Domain.Entities;

namespace Domain.Contracts
{
    public interface IUserRepository
    {
        Task<AppUser> GetUserByIdAsync(Guid id);
        Task<AppUser> GetUserByEmailAsync(string email);
        bool IsEmailTaken(string email);
        AppUser GetUserById(Guid id);
        Task<bool> CreateUserAsync(AppUser user, string password);
        Task<bool> CreateUserWithRoleAsync<T>(T user, string password, string role) where T : AppUser;
        Task<bool> ValidatePasswordAsync(AppUser user, string password);
        Task<bool> AddToRoleAsync(AppUser user, string role);
        bool IsUsernameTaken(string username);
    }
}