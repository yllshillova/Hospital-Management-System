using Domain.Entities;

public interface IUserRepository
{
    Task<AppUser> GetUserByEmailAsync(string email);
    Task<bool> IsEmailTakenAsync(string email);
    Task<bool> CreateUserAsync(AppUser user, string password);
    Task<bool> ValidatePasswordAsync(AppUser user, string password);
    Task<bool> AddToRoleAsync(AppUser user, string role);
}