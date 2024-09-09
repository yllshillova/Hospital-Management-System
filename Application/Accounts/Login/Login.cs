using Application.Accounts.Users;
using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Accounts.Login
{
    public class Login
    {
        public record LoginCommand(LoginDto Login) : IRequest<Result<UserDto>>;

        public class CommandValidator : AbstractValidator<LoginCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Login).SetValidator(new LoginValidator());
            }
        }

        public class LoginCommandHandler(IUserRepository _userRepository, ITokenRepository _tokenRepository, IMapper _mapper)
            : IRequestHandler<LoginCommand, Result<UserDto>>
        {
            public async Task<Result<UserDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetUserByEmailAsync(request.Login.Email);

                if (user == null) return Result<UserDto>.Failure(ErrorType.NotFound, $"The user with the email : {request.Login.Email} doesnt exist!");

                var result = await _userRepository.ValidatePasswordAsync(user, request.Login.Password);

                if (!result)
                    return Result<UserDto>.Failure(ErrorType.Unauthorized, "Wrong credentials, try again!");

                string accessToken;
                string refreshToken;

                // Check for a valid refresh token
                var existingRefreshToken = await _tokenRepository.GetRefreshTokenAsync(user.Id);

                if (existingRefreshToken == null)
                {
                    // If no valid refresh token exists, check and delete any expired refresh tokens
                    await _tokenRepository.DeleteExpiredRefreshTokenAsync(user.Id);

                    // Create a new refresh token
                    refreshToken = _tokenRepository.GenerateRefreshToken();
                    await _tokenRepository.SaveRefreshTokenAsync(user.Id, refreshToken);
                }
                else
                {
                    // Reuse the existing valid refresh token
                    refreshToken = existingRefreshToken.Token;
                }

                var accessTokenResult = await _tokenRepository.CreateAccessTokenAsync(user);
                accessToken = accessTokenResult.Token;

                var userDto = _mapper.Map<UserDto>(user);
                userDto.AccessToken = accessToken;
                userDto.RefreshToken = refreshToken;

                return Result<UserDto>.Success(userDto);
            }
        }
    }
}
