using Application.BaseValidators;
using FluentValidation;

namespace Application.Accounts.Register
{
    public class RegisterValidator : AbstractValidator<RegisterDto>
    {
        public RegisterValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<RegisterDto, string>())
                               .SetValidator(new ValidLengthValidator<RegisterDto, string>(4, 100));
            RuleFor(d => d.LastName).SetValidator(new NotNullValidator<RegisterDto, string>())
                                    .SetValidator(new ValidLengthValidator<RegisterDto, string>(4, 100));
            RuleFor(d => d.Email).SetValidator(new NotNullValidator<RegisterDto, string>())
                                 .SetValidator(new EmailValidator<RegisterDto, string>());
            RuleFor(d => d.Password).SetValidator(new NotNullValidator<RegisterDto, string>())
                                 .Matches(IsPasswordComplex());
        }



        private string IsPasswordComplex()
        {
            string regex = @"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$";
            return regex;
        }
    }
}