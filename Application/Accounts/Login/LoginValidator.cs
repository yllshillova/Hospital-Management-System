using Application.BaseValidators;
using FluentValidation;

namespace Application.Accounts.Login
{
    public class LoginValidator : AbstractValidator<LoginDto>
    {
        public LoginValidator()
        {
            RuleFor(d => d.Email).SetValidator(new NotNullValidator<LoginDto, string>())
                                 .SetValidator(new EmailValidator<LoginDto, string>());
            RuleFor(d => d.Password).SetValidator(new NotNullValidator<LoginDto, string>())
                                 .Matches(IsPasswordComplex()).WithMessage("The password is not complex enough!");
        }

        private string IsPasswordComplex()
        {
            string regex = @"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$";
            return regex;
        }
    }
}