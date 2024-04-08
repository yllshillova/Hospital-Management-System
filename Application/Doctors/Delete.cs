using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

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
                if (visits is null || !visits.Any())
                {
                    doctor.IsDeleted = true;
                    var result = await _doctorRepository.UpdateAsync(doctor);
                    if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the doctor! Try again.");
                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure(ErrorType.BadRequest, "Unable to delete the doctor. The doctor cannot be deleted because there are existing records associated with them, such as appointments or visits." +
                    " \r\nBefore deleting the doctor, please ensure that all related records are properly handled or reassigned to another doctor.");
            }

        }
    }
}
