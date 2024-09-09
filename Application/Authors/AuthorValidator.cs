using Application.Authors;
using Application.BaseValidators;
using FluentValidation;

namespace Application.Employees
{
    public class AuthorValidator : AbstractValidator<AuthorDto>
    {
        public AuthorValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<AuthorDto, string>()).SetValidator(new ValidLengthValidator<AuthorDto, string>(4, 500));
            RuleFor(d => d.BirthDate).SetValidator(new NotNullValidator<AuthorDto, DateTime>());

            RuleFor(d => d.Country).SetValidator(new NotNullValidator<AuthorDto, string>());
        }

    }
}
