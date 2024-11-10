using Application.BaseValidators;
using FluentValidation;

namespace Application.Rooms
{
    public class RoomValidator : AbstractValidator<RoomDto>
    {
        public RoomValidator()
        {
            //RuleFor(d => d.IsFree).SetValidator(new NotNullValidator<RoomDto, bool>());
            RuleFor(d => d.RoomNumber).SetValidator(new NotNullValidator<RoomDto, int>());
            RuleFor(d => d.Beds).SetValidator(new NotNullValidator<RoomDto, int>())
                                    .LessThanOrEqualTo(4).WithMessage("Beds must be at most 4");
            RuleFor(d => d.BedsAvailable).SetValidator(new NotNullValidator<RoomDto, int>())
                                    .LessThanOrEqualTo(4).WithMessage("Beds available must be at most 4");
            RuleFor(d => d.DepartmentId).SetValidator(new NotNullValidator<RoomDto, Guid>());
        }
    }
}
