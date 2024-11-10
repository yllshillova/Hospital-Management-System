using Domain.Entities;

namespace Domain.Contracts
{
    public interface ITokenRepository
    {
        Task<(string accessToken, string refreshToken)> CreateTokens(AppUser user);
        Task<AccessToken> CreateAccessTokenAsync(AppUser user);
        string GenerateRefreshToken();
        Task<RefreshToken> SaveRefreshTokenAsync(Guid userId, string refreshToken);
        Task<RefreshToken> GetRefreshTokenAsync(Guid userId);
        Task DeleteExpiredRefreshTokenAsync(Guid userId);
    }

}
