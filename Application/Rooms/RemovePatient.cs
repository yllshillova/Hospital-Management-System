using Application.Core;
using Domain.Contracts;
using FluentValidation;
using MediatR;

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

        public class RemovePatientCommandHandler(IRoomRepository _roomRepository) : IRequestHandler<RemovePatientCommand, Result<Unit>>
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
