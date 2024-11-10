using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Patients
{
    public class Delete
    {
        public record DeletePatientCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeletePatientHandler(IPatientRepository _patientRepository) : IRequestHandler<DeletePatientCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeletePatientCommand request, CancellationToken cancellationToken)
            {
                var patient = await _patientRepository.GetByIdAsync(request.Id);
                if (patient is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                if (patient.IsDeleted == true) return Result<Unit>.Failure(ErrorType.BadRequest, "Cannot delete the deactivated patient!");


                patient.IsDeleted = true;
                var result = await _patientRepository.UpdateAsync(patient);

                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the patient. Try again!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
