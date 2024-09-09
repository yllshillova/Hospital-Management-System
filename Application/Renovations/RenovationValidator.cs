using Application.BaseValidators;
using FluentValidation;

namespace Application.Renovations
{
    public class RenovationValidator : AbstractValidator<RenovationDto>
    {
        public RenovationValidator()
        {
            RuleFor(d => d.Description).SetValidator(new NotNullValidator<RenovationDto, string>())
                                 .SetValidator(new ValidLengthValidator<RenovationDto, string>(2, 100));

            RuleFor(d => d.Cost)
                            .SetValidator(new NotNullValidator<RenovationDto, double>());
            RuleFor(d => d.BuildingID).SetValidator(new NotNullValidator<RenovationDto, Guid>());

        }


    }
}
