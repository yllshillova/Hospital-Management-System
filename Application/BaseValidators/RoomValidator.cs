using Application.DTOs;
using FluentValidation;

namespace Application.BaseValidators
{
    public class RoomValidator : AbstractValidator<RoomDto>
    {
        public RoomValidator()
        {
            RuleFor(d => d.Type).NotEmpty().Length(3, 10).WithMessage("Type field is required.");
            RuleFor(d => d.IsFree).NotNull().WithMessage("IsFree field is required.");
            RuleFor(d => d.PatientId).NotEmpty().WithMessage("PatientId field is required.");
        }
    }
}
