using Application.Rooms;
using FluentValidation;

namespace Application.BaseValidators
{
    public class RoomValidator : AbstractValidator<RoomDto>
    {
        public RoomValidator()
        {
            RuleFor(d => d.Type).SetValidator(new NotNullValidator<RoomDto, string>())
                                            .SetValidator(new ValidLengthValidator<RoomDto, string>(4, 100));
            RuleFor(d => d.IsFree).SetValidator(new NotNullValidator<RoomDto, bool>());
            RuleFor(d => d.PatientId).SetValidator(new NotNullValidator<RoomDto, Guid>());
        }
    }
}
