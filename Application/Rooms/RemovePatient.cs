using Application.Core;
using Domain.Contracts;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Application.Rooms
{
    public class RemovePatient
    {
        public record RemovePatientCommand(Guid PatientId) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<RemovePatientCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.PatientId).NotEmpty();
            }
        }

        public class RemovePatientCommandHandler(IRoomRepository _roomRepository, IHubContext<NotificationHub> _notificationHub) : IRequestHandler<RemovePatientCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(RemovePatientCommand request, CancellationToken cancellationToken)
            {
                if (request.PatientId != Guid.Empty)
                {
                    var room = await _roomRepository.GetRoomByPatientIdAsync(request.PatientId);
                    if (room is null) return Result<Unit>.Failure(ErrorType.NotFound, "Room not found for the patient");

                    var patientToRemove = room.Patients.FirstOrDefault(p => p.Id == request.PatientId);
                    if (patientToRemove != null)
                    {
                        patientToRemove.RoomId = null;
                        patientToRemove.Room = null;

                        room.Patients.Remove(patientToRemove);
                        room.BedsAvailable++;

                        string message = $"Patient {patientToRemove.Name} {patientToRemove.LastName} has been removed from room #{room.RoomNumber}";

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

                        var result = await _roomRepository.UpdateAsync(room);
                        if (!result)
                            return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to remove patient from room");

                        return Result<Unit>.Success(Unit.Value);
                    }
                    return Result<Unit>.Failure(ErrorType.NotFound, "Patient not found in the room");
                }
                return Result<Unit>.Failure(ErrorType.BadRequest, "PatientId is empty");
            }
        }

    }
}
