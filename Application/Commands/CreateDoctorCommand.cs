using Application.Core;
using Application.DTOs;
using Application.Validators;
using FluentValidation;
using MediatR;

namespace Application.Commands
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
