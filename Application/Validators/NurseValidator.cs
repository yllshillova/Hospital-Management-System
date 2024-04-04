using Application.Nurses;
using FluentValidation;

namespace Application.Validators
{
    public class NurseValidator : AbstractValidator<NurseDto>
    {
        public NurseValidator()
        {
            RuleFor(d => d.StaffId).NotEmpty().WithMessage("StaffId field is required.");
        }
    }
}
