using Application.BaseValidators;
using FluentValidation;

namespace Application.Rooms
{
    public class RoomValidator : AbstractValidator<RoomDto>
    {
        public RoomValidator()
        {
            RuleFor(d => d.IsFree).SetValidator(new NotNullValidator<RoomDto, bool>());
            RuleFor(d => d.PatientId).SetValidator(new NotNullValidator<RoomDto, Guid>());
            RuleFor(d => d.Capacity).SetValidator(new NotNullValidator<RoomDto, int>())
                                    .LessThanOrEqualTo(10).WithMessage("Capacity must be at most 10");
        }
    }
}
