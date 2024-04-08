using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Doctors
{
    public class Delete
    {
        public record DeleteDoctorCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteDoctorCommandHandler(IDoctorRepository _doctorRepository) : IRequestHandler<DeleteDoctorCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteDoctorCommand request, CancellationToken cancellationToken)
            {
                var doctor = await _doctorRepository.GetByIdAsync(request.Id);
                if (doctor is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var result = await _doctorRepository.DeleteAsync(doctor);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest,"Failed to delete the doctor! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
