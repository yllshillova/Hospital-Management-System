using Application.BaseValidators;
using FluentValidation;

namespace Application.Rooms
{
    public class RoomPatientValidator : AbstractValidator<RoomPatientDto>
    {
        public RoomPatientValidator()
        {

        }
    }
}