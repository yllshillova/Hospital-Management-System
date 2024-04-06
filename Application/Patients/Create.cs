using Application.Core;
using Application.Validators;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Patients
{
    public class Create
    {
        public record CreatePatientCommand(PatientDto Patient) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreatePatientCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Patient).SetValidator(new PatientValidator());
            }
        }

        public class CreatePatientCommandHandler(IPatientRepository _patientRepository, IMapper _mapper) : IRequestHandler<CreatePatientCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreatePatientCommand request, CancellationToken cancellationToken)
            {
                if (request.Patient is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again.");

                var patient = _mapper.Map<Patient>(request.Patient);
                if (patient is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                var result = await _patientRepository.CreateAsync(patient);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the patient! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
