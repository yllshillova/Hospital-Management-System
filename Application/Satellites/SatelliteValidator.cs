using Application.BaseValidators;
using FluentValidation;

namespace Application.Satellites
{
    public class SatelliteValidator : AbstractValidator<SatelliteDto>
    {
        public SatelliteValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<SatelliteDto, string>()).SetValidator(new ValidLengthValidator<SatelliteDto, string>(4, 100));

        }
    }
}
