using Domain.Entities;

public interface IUserRepository
{
    Task<AppUser> GetUserByEmailAsync(string email);
    bool IsEmailTaken(string email);
    Task<bool> CreateUserAsync(AppUser user, string password);
    Task<bool> CreateUserWithRoleAsync<T>(T user, string password, string role) where T : AppUser; // Add constraint
    Task<bool> ValidatePasswordAsync(AppUser user, string password);
    Task<bool> AddToRoleAsync(AppUser user, string role);
    bool IsUsernameTaken(string username);
}