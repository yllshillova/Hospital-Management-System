using Application.Core;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Application.Rooms
{
    public class AssignPatient
    {
        public record AssignPatientCommand(Guid PatientId, Guid DoctorId) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<AssignPatientCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.PatientId).NotEmpty();
                RuleFor(x => x.DoctorId).NotEmpty();
            }

        }

        public class AssignPatientCommandHandler(IHubContext<NotificationHub> _notificationHub, IRoomRepository _roomRepository, IDoctorRepository _doctorRepository, IPatientRepository _patientRepository) : IRequestHandler<AssignPatientCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(AssignPatientCommand request, CancellationToken cancellationToken)
            {
                if (request.PatientId != Guid.Empty && request.DoctorId != Guid.Empty)
                {
                    var patient = await _patientRepository.GetByIdAsync(request.PatientId);
                    if (patient is null) return Result<Unit>.Failure(ErrorType.NotFound, "Patient not found");

                    var doctor = await _doctorRepository.GetByIdAsync(request.DoctorId);
                    if (doctor is null) return Result<Unit>.Failure(ErrorType.NotFound, "Doctor not found");

                    var freeRoom = await _roomRepository.GetFirstFreeRoom(doctor.DepartmentId);
                    if (freeRoom is null) return Result<Unit>.Failure(ErrorType.NotFound, "No free room available");

                    freeRoom.Patients ??= new List<Patient>();
                    freeRoom.Patients.Add(patient);
                    freeRoom.BedsAvailable -= 1;

                    string patientFullName = $"{patient.Name} {patient.LastName}";
                    string message = $"Patient  {patientFullName} has been assigned to room #{freeRoom.RoomNumber} ";

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

                    var result = await _roomRepository.UpdateAsync(freeRoom);
                    if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, $"Failed to assign {patientFullName} to room");
                    return Result<Unit>.Success(Unit.Value);
                }
                return Result<Unit>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
