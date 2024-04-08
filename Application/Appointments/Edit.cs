using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Appointments
{
    public class Edit
    {
        public record UpdateAppointmentCommand(AppointmentDto Appointment) : IRequest<Result<Unit>>;

        public class UpdateAppointmentCommandValidator : AbstractValidator<UpdateAppointmentCommand>
        {
            public UpdateAppointmentCommandValidator()
            {
                RuleFor(x => x.Appointment).SetValidator(new AppointmentValidator());
            }
        }

        public class UpdateAppointmentCommandHandler(IAppointmentRepository _appointmentRepository, IMapper _mapper) : IRequestHandler<UpdateAppointmentCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateAppointmentCommand request, CancellationToken cancellationToken)
            {
                var appointment = await _appointmentRepository.GetByIdAsync(request.Appointment.Id);
                if (appointment is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                _mapper.Map(request.Appointment, appointment);
                appointment.UpdatedAt = DateTime.UtcNow;

                var result = await _appointmentRepository.UpdateAsync(appointment);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the appointment. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
