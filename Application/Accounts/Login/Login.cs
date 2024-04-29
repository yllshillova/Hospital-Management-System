using Application.Core;
using FluentValidation;
using MediatR;

namespace Application.Accounts.Login
{
    public class Login
    {
        public record LoginCommand(LoginDto Login) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<LoginCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Login).SetValidator(new LoginValidator());
            }
        }


    }
}
