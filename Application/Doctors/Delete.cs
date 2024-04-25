using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Doctors
{
    public class Delete
    {
        public record DeleteDoctorCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteDoctorCommandHandler(IDoctorRepository _doctorRepository, IVisitRepository _visitRepository)
            : IRequestHandler<DeleteDoctorCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteDoctorCommand request, CancellationToken cancellationToken)
            {
                var doctor = await _doctorRepository.GetByIdAsync(request.Id);
                if (doctor is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var visits = await _visitRepository.GetVisitsByDoctorIdAsync(doctor.Id);
                // Check if there are any visits associated with the doctor
                if (visits != null && visits.Any())
                {
                    doctor.IsDeleted = true;
                    doctor.UpdatedAt = DateTime.Now;
                    var result = await _doctorRepository.UpdateAsync(doctor);

                    if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to mark the doctor as deleted! Try again.");
                    return Result<Unit>.Success(Unit.Value);
                }
                else
                {
                    // If there are no visits, delete the doctor
                    var result = await _doctorRepository.DeleteAsync(doctor);

                    if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the doctor! Try again.");
                    return Result<Unit>.Success(Unit.Value);
                }
            }
        }
    }
}
