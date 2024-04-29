using Application.Core;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Accounts.Register
{
    public class Register
    {
        public record RegisterCommand(RegisterDto Register) : IRequest<Result<UserDto>>;

        public class CommandValidator : AbstractValidator<RegisterCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Register).SetValidator(new RegisterValidator());
            }
        }

        public class RegisterCommandHandler(IUserRepository _userRepository, ITokenRepository _tokenRepository) : IRequestHandler<RegisterCommand, Result<UserDto>>
        {
            public async Task<Result<UserDto>> Handle(RegisterCommand request, CancellationToken cancellationToken)
            {
                if (await _userRepository.IsEmailTakenAsync(request.Register.Email))
                {
                    return Result<UserDto>.Failure(ErrorType.BadRequest, "Email is taken. Try another one!");
                }

                var user = new AppUser
                {
                    Email = request.Register.Email,
                    Name = request.Register.Name,
                    LastName = request.Register.LastName,
                };


                var result = await _userRepository.CreateUserAsync(user, request.Register.Password);

                if (!result) return Result<UserDto>.Failure(ErrorType.BadRequest, "Failed to create the user! Try again.");

                var userDto = await CreateUserObject(user);

                return Result<UserDto>.Success(userDto);
            }

            private async Task<UserDto> CreateUserObject(AppUser user)
            {
                return new UserDto
                {
                    UserName = user.UserName,
                    Token = await _tokenRepository.CreateToken(user),
                };
            }

        }

    }
}
