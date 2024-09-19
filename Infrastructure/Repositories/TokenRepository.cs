//using Domain.Contracts;
//using Domain.Entities;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace Infrastructure.Repositories
//{
//    public class TokenRepository : ITokenRepository
//    {
//        private readonly IConfiguration _config;
//        private readonly UserManager<AppUser> _userManager;

//        public TokenRepository(IConfiguration config, UserManager<AppUser> userManager)
//        {
//            _config = config;
//            _userManager = userManager;
//        }

//        public async Task<string> CreateToken(AppUser user)
//        {
//            var claims = new List<Claim>
//            {
//                new Claim("name", user.Name),
//                new Claim("lastName", user.LastName),
//                new Claim(ClaimTypes.Email, user.Email),
//                new Claim("id", user.Id.ToString()),
//            };

//            var roles = await _userManager.GetRolesAsync(user);
//            foreach (var role in roles)
//            {
//                claims.Add(new Claim(ClaimTypes.Role, role));
//            }

//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

//            var tokenDescriptor = new SecurityTokenDescriptor
//            {
//                Subject = new ClaimsIdentity(claims),
//                Expires = DateTime.UtcNow.AddDays(7),
//                SigningCredentials = creds
//            };
//            var tokenHandler = new JwtSecurityTokenHandler();
//            var token = tokenHandler.CreateToken(tokenDescriptor);

//            return tokenHandler.WriteToken(token);
//        }
//    }
//}

using Domain.Contracts;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Infrastructure.Repositories
{

    internal sealed class TokenRepository : ITokenRepository
    {
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;
        private readonly DataContext _context;

        public TokenRepository(IConfiguration config, UserManager<AppUser> userManager, DataContext context)
        {
            _config = config;
            _userManager = userManager;
            _context = context;
        }

        public async Task<(string accessToken, string refreshToken)> CreateTokens(AppUser user)
        {
            var accessToken = await CreateAccessTokenAsync(user);
            var refreshToken = GenerateRefreshToken();
            await SaveRefreshTokenAsync(user.Id, refreshToken);

            return (accessToken.Token, refreshToken);
        }

        public async Task<AccessToken> CreateAccessTokenAsync(AppUser user)
        {
            var claims = new List<Claim>
        {
            new Claim("name", user.Name),
            new Claim("lastName", user.LastName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("id", user.Id.ToString())
        };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(5),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return new AccessToken
            {
                Token = tokenString,
                ExpiryDate = tokenDescriptor.Expires.Value
            };
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber); // Return the refresh token as a Base64 string
        }

        public async Task<RefreshToken> SaveRefreshTokenAsync(Guid userId, string refreshToken)
        {
            var token = new RefreshToken
            {
                Id = Guid.NewGuid(),
                Token = refreshToken,
                ExpiryDate = DateTime.Now.AddMinutes(20),
                UserId = userId
            };

            _context.RefreshTokens.Add(token);
            await _context.SaveChangesAsync();

            return token;
        }

        public async Task<RefreshToken> GetRefreshTokenAsync(Guid userId)
        {

            var token = await _context.RefreshTokens
                .SingleOrDefaultAsync(rt => rt.UserId == userId && rt.ExpiryDate > DateTime.Now);
            return token;
        }

        public async Task DeleteExpiredRefreshTokenAsync(Guid userId)
        {
            var expiredToken = await _context.RefreshTokens
                .Where(rt => rt.UserId == userId && rt.ExpiryDate <= DateTime.Now)
                .FirstOrDefaultAsync();

            if (expiredToken != null)
            {
                _context.RefreshTokens.Remove(expiredToken);
                await _context.SaveChangesAsync();
            }
        }

    }
}