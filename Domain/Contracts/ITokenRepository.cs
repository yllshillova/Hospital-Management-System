using Domain.Entities;

namespace Domain.Contracts
{
    public interface ITokenRepository
    {
        Task<string> CreateToken(AppUser user);
    }
}
