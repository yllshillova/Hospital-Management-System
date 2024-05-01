using Application.BaseValidators;
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
                .Matches(IsPasswordComplex());
        }

        private bool BeUniqueEmail(string email)
        {
            // Use the synchronous method from the user repository
            return !_userRepository.IsEmailTaken(email);
        }

        private bool BeUniqueUsername(string username)
        {
            // Use the synchronous method from the user repository
            return !_userRepository.IsUsernameTaken(username);
        }

        private string IsPasswordComplex()
        {
            string regex = @"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$";
            return regex;
        }
    }
}
