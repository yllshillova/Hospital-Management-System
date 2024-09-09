using Application.BaseValidators;
using FluentValidation;

namespace Application.Planets
{
    public class PlanetValidator : AbstractValidator<PlanetDto>
    {
        public PlanetValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<PlanetDto, string>()).SetValidator(new ValidLengthValidator<PlanetDto, string>(4, 100));
            RuleFor(d => d.Type).SetValidator(new NotNullValidator<PlanetDto, string>()).SetValidator(new ValidLengthValidator<PlanetDto, string>(4, 100));

        }
    }
}
