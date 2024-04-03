using Application.Core;
using Application.Validators;
using FluentValidation;
using MediatR;

namespace Application.Doctors
{
    public record CreateDoctorCommand(DoctorDto Doctor) : IRequest<Result<Unit>>
    {
    }

    public class CommandValidator : AbstractValidator<CreateDoctorCommand>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Doctor).SetValidator(new DoctorValidator());
        }
    }

}
