using Application.Core;
using Application.BaseValidators;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Patients
{
    public class Edit
    {
        public record UpdatePatientCommand(PatientDto Patient) : IRequest<Result<Unit>>;

        public class UpdatePatientCommandValidator : AbstractValidator<UpdatePatientCommand>
        {
            public UpdatePatientCommandValidator()
            {
                RuleFor(x => x.Patient).SetValidator(new PatientValidator());
            }
        }

        public class UpdateDoctorCommandHandler(IPatientRepository _patientRepository, IMapper _mapper) : IRequestHandler<UpdatePatientCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
            {
                var patient = await _patientRepository.GetByIdAsync(request.Patient.Id);
                if (patient is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                _mapper.Map(request.Patient, patient);
                var result = await _patientRepository.UpdateAsync(patient);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the patient! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
