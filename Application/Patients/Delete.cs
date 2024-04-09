using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Patients
{
    public class Delete
    {
        public record DeletePatientCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeletePatientCommandHandler(IPatientRepository _patientRepository ,IVisitRepository _visitRepository) : IRequestHandler<DeletePatientCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeletePatientCommand request, CancellationToken cancellationToken)
            {
                var patient = await _patientRepository.GetByIdAsync(request.Id);
                if (patient is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var visits = await _visitRepository.GetVisitsByPatientIdAsync(patient.Id);
                if(visits is not null && visits.Any())
                {
                    patient.IsDeleted = true;
                    patient.UpdatedAt = DateTime.Now;
                }
                else
                {
                    var deleteResult = await _patientRepository.DeleteAsync(patient);
                    if (!deleteResult) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the patient! Try again.");
                }
                
                var result = await _patientRepository.UpdateAsync(patient);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the patient! Try again.");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
