using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using MediatR;

namespace Application.Patients
{
    public class Delete
    {
        public record DeletePatientCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeletePatientCommandHandler(IPatientRepository _patientRepository , IAppointmentRepository _appointmentRepository) : IRequestHandler<DeletePatientCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeletePatientCommand request, CancellationToken cancellationToken)
            {
                var patient = await _patientRepository.GetByIdAsync(request.Id);
                if (patient is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var appointments = await _appointmentRepository.GetAppointmentsByPatientId(patient.Id);
                //TODO: soft delete should be enabled
                //patient.IsDeleted = true;
                //patient.UpdatedAt = DateTime.UtcNow;
                //var result = await _patientRepository.UpdateAsync(patient);
                var result = await _patientRepository.DeleteAsync(patient);
                

                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the patient! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
