using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Application.Visits
{
    public class Create
    {
        public record CreateVisitCommand(VisitDto Visit) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateVisitCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Visit).SetValidator(new VisitValidator());
            }
        }

        public class CreateVisitCommandHandler(IDoctorRepository _doctorRepository, IPatientRepository _patientRepository,
            IHubContext<NotificationHub> _notificationHub, IVisitRepository _visitRepository, IAppointmentRepository _appointmentRepository, IMapper _mapper) : IRequestHandler<CreateVisitCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateVisitCommand request, CancellationToken cancellationToken)
            {
                if (request.Visit is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again.");

                var visit = _mapper.Map<Visit>(request.Visit);
                if (visit is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                visit.CreatedAt = DateTime.Now;
                visit.UpdatedAt = visit.CreatedAt;

                var intersectingAppointment = await _appointmentRepository.GetIntersectingAppointment(visit.PatientId, visit.DoctorId);
                if (intersectingAppointment == null) return Result<Unit>.Failure(ErrorType.NotFound, "Appointment associated with the visit not found!");

                intersectingAppointment.Status = "Completed";

                var patient = await _patientRepository.GetByIdAsync(intersectingAppointment.PatientId);
                var doctor = await _doctorRepository.GetByIdAsync(intersectingAppointment.DoctorId);

                string patientFullName = $"{patient.Name} {patient.LastName}";
                string doctorFullName = $"Dr. {doctor.Name} {doctor.LastName}";

                string message = $"Appointment is completed for {patientFullName} at {doctorFullName} ";

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

                var appointmentUpdateResult = await _appointmentRepository.UpdateAsync(intersectingAppointment);
                if (!appointmentUpdateResult) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update appointment status! Try again.");

                var result = await _visitRepository.CreateAsync(visit);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the visit report! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
