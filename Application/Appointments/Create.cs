using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Appointments

{
    public class Create
    {
        public record CreateAppointmentCommand(AppointmentDto Appointment) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateAppointmentCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Appointment).SetValidator(new AppointmentValidator());
            }
        }

        public class CreateAppointmentHandler(IAppointmentRepository _appointmentRepository, IMapper _mapper) : IRequestHandler<CreateAppointmentCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateAppointmentCommand request, CancellationToken cancellationToken)
            {
                if (request.Appointment is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var appointment = _mapper.Map<Appointment>(request.Appointment);
                if (appointment is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                appointment.CreatedAt = DateTime.UtcNow;
                appointment.UpdatedAt = DateTime.UtcNow;

                var result = await _appointmentRepository.CreateAsync(appointment);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the appointment. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
