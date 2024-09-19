using Application.BaseValidators;
using FluentValidation;

namespace Application.Sculptures
{
    public class SculptureValidator : AbstractValidator<SculptureDto>
    {
        public SculptureValidator()
        {
            RuleFor(d => d.Title).SetValidator(new NotNullValidator<SculptureDto, string>()).SetValidator(new ValidLengthValidator<SculptureDto, string>(4, 100));
            RuleFor(d => d.Material).SetValidator(new NotNullValidator<SculptureDto, string>()).SetValidator(new ValidLengthValidator<SculptureDto, string>(4, 100));
            RuleFor(d => d.SculptorId).SetValidator(new NotNullValidator<SculptureDto, Guid>());


        }
    }
}
