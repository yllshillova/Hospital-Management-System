using Application.Core;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Accounts.Tokens
{
    public class RefreshToken
    {
        public record RefreshTokenCommand(Guid UserId) : IRequest<Result<AccessToken>>;

        public class CommandValidator : AbstractValidator<RefreshTokenCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserId).NotEqual(Guid.Empty).WithMessage("User ID must be a valid GUID.");
            }
        }

        public class RefreshTokenCommandHandler(ITokenRepository _tokenRepository, IUserRepository _userRepository)
            : IRequestHandler<RefreshTokenCommand, Result<AccessToken>>
        {
            public async Task<Result<AccessToken>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
            {

                var refreshToken = await _tokenRepository.GetRefreshTokenAsync(request.UserId);

                //checking if the refresh token is valid and not expired
                if (refreshToken == null || refreshToken.ExpiryDate < DateTime.Now)
                {
                    return Result<AccessToken>.Failure(ErrorType.Unauthorized, "You have exceeded the use duration. Please log in to access the app!");
                }


                // Get the user associated with the refresh token
                var user = await _userRepository.GetUserByIdAsync(refreshToken.UserId);
                if (user == null)
                {
                    return Result<AccessToken>.Failure(ErrorType.NotFound, "User not found.");
                }

                // Generate a new access token for the user
                var accessToken = await _tokenRepository.CreateAccessTokenAsync(user);
                return Result<AccessToken>.Success(accessToken);

            }
        }
    }
}
