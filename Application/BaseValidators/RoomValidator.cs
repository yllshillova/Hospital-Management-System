using FluentValidation;

<<<<<<<< HEAD:Application/Rooms/RoomValidator.cs
namespace Application.Rooms
========
namespace Application.BaseValidators
>>>>>>>> 19aef6da2b1e1afa6d427be3d384cd4239cf6c30:Application/BaseValidators/RoomValidator.cs
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
