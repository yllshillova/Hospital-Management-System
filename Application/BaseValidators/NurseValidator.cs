using Application.DTOs;
using FluentValidation;

namespace Application.BaseValidators
{
    public class NurseValidator : AbstractValidator<NurseDto>
    {
        public NurseValidator()
        {
            RuleFor(d => d.StaffId).NotEmpty().WithMessage("StaffId field is required.");
        }
    }
}
