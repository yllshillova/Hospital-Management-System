using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.SignalR;

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

        public class CreateAppointmentHandler(IDoctorRepository _doctorRepository, IPatientRepository _patientRepository, IHubContext<NotificationHub> _notificationHub, IAppointmentRepository _appointmentRepository, IMapper _mapper) : IRequestHandler<CreateAppointmentCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateAppointmentCommand request, CancellationToken cancellationToken)
            {
                if (request.Appointment is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var isValidAppointment = await _appointmentRepository.IsValidAppointment(request.Appointment.CheckInDate, request.Appointment.CheckOutDate, request.Appointment.DoctorId);
                if (!isValidAppointment) return Result<Unit>.Failure(ErrorType.BadRequest, "The doctor is not available for the selected time. Please select another convenience!");

                var appointment = _mapper.Map<Appointment>(request.Appointment);

                if (appointment is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");
                appointment.Status = "Scheduled";
                appointment.CreatedAt = DateTime.Now;
                appointment.UpdatedAt = appointment.CreatedAt;

                var patient = await _patientRepository.GetByIdAsync(request.Appointment.PatientId);
                var doctor = await _doctorRepository.GetByIdAsync(request.Appointment.DoctorId);


                string patientFullName = $"{patient.Name} {patient.LastName}";
                string doctorFullName = $"Dr. {doctor.Name} {doctor.LastName}";

                string message = $"New appointment created for {patientFullName} at {doctorFullName}";


                try
                {
                    // Send notification
                    await _notificationHub.Clients.All.SendAsync("ReceiveNotification", message, "info");
                }
                catch (Exception ex)
                {
                    // Log exception and handle notification send failure
                    return Result<Unit>.Failure(ErrorType.NotFound, $"Failed to send notification: {ex.Message}");
                }
                var result = await _appointmentRepository.CreateAsync(appointment);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the appointment. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
