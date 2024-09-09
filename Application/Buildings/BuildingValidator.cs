using Application.BaseValidators;
using FluentValidation;

namespace Application.Buildings
{
    public class BuildingValidator : AbstractValidator<BuildingDto>
    {
        public BuildingValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<BuildingDto, string>()).SetValidator(new ValidLengthValidator<BuildingDto, string>(4, 500));
            RuleFor(d => d.Location).SetValidator(new NotNullValidator<BuildingDto, string>()).SetValidator(new ValidLengthValidator<BuildingDto, string>(4, 500));

        }
    }
}
