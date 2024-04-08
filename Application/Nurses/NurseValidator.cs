using Application.BaseValidators;
using FluentValidation;

namespace Application.Nurses
{
    public class NurseValidator : AbstractValidator<NurseDto>
    {
        public NurseValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<NurseDto, string>())
                                .SetValidator(new ValidLengthValidator<NurseDto, string>(4, 100));
            RuleFor(d => d.LastName).SetValidator(new NotNullValidator<NurseDto, string>())
                                    .SetValidator(new ValidLengthValidator<NurseDto, string>(4, 100));
            RuleFor(d => d.Residence).SetValidator(new NotNullValidator<NurseDto, string>())
                                     .SetValidator(new ValidLengthValidator<NurseDto, string>(4, 100));
            RuleFor(d => d.Address).SetValidator(new NotNullValidator<NurseDto, string>())
                                   .SetValidator(new ValidLengthValidator<NurseDto, string>(4, 100));
            RuleFor(d => d.Gender).SetValidator(new NotNullValidator<NurseDto, string>())
                                  .SetValidator(new ValidLengthValidator<NurseDto, string>(4, 100));
            RuleFor(d => d.DepartmentId).SetValidator(new NotNullValidator<NurseDto, Guid>());
        }
    }
}
