using Application.BaseValidators;
using FluentValidation;

namespace Application.Sculptors
{
    public class SculptorValidator : AbstractValidator<SculptorDto>
    {
        public SculptorValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<SculptorDto, string>()).SetValidator(new ValidLengthValidator<SculptorDto, string>(4, 100));
            RuleFor(d => d.BirthYear).SetValidator(new NotNullValidator<SculptorDto, int>());

        }
    }
}
