using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Appointments
{
    public class Delete
    {
        public record DeleteAppointmentCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteAppointmentCommandHandler(IAppointmentRepository _appointmentRepository) : IRequestHandler<DeleteAppointmentCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteAppointmentCommand request, CancellationToken cancellationToken)
            {
                var appointment = await _appointmentRepository.GetByIdAsync(request.Id);
                if (appointment is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var result = await _appointmentRepository.DeleteAsync(appointment);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the appointment. Try again!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
