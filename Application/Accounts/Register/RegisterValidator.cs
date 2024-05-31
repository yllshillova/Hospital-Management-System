using Application.BaseValidators;
using Domain.Contracts;
using FluentValidation;

namespace Application.Accounts.Register
{
    public class RegisterValidator : AbstractValidator<RegisterDto>
    {
        private readonly IUserRepository _userRepository;

        public RegisterValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;

            RuleFor(d => d.Name)
                .SetValidator(new NotNullValidator<RegisterDto, string>())
                .SetValidator(new ValidLengthValidator<RegisterDto, string>(4, 100));

            RuleFor(d => d.LastName)
                .SetValidator(new NotNullValidator<RegisterDto, string>())
                .SetValidator(new ValidLengthValidator<RegisterDto, string>(4, 100));

            RuleFor(d => d.UserName)
                .SetValidator(new NotNullValidator<RegisterDto, string>())
                .SetValidator(new ValidLengthValidator<RegisterDto, string>(4, 100))
                .Must(BeUniqueUsername).WithMessage("Username is taken. Try another one!");

            RuleFor(d => d.Email)
                .SetValidator(new NotNullValidator<RegisterDto, string>())
                .SetValidator(new EmailValidator<RegisterDto, string>())
                .Must(BeUniqueEmail).WithMessage("Email is taken. Try another one!");

            RuleFor(d => d.Password)
            .SetValidator(new NotNullValidator<RegisterDto, string>())
            .Matches(IsPasswordComplex()).WithMessage("Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.");

        }

        private bool BeUniqueEmail(string email)
        {
            return !_userRepository.IsEmailTaken(email);
        }

        private bool BeUniqueUsername(string username)
        {
            return !_userRepository.IsUsernameTaken(username);
        }

        private string IsPasswordComplex()
        {
            string regex = @"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$";
            return regex;
        }
    }
}
