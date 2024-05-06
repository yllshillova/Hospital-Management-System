using Application.Core;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Rooms
{
    public class AssignPatient
    {
        public record AssignPatientCommand(Guid PatientId) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<AssignPatientCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.PatientId).NotEmpty();
            }

        }

        public class AssignPatientCommandHandler(IRoomRepository _roomRepository, IVisitRepository _visitRepository) : IRequestHandler<AssignPatientCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(AssignPatientCommand request, CancellationToken cancellationToken)
            {
                if (request.PatientId != Guid.Empty)
                {
                    var patient = await _visitRepository.GetPatientById(request.PatientId);
                    if (patient is null) return Result<Unit>.Failure(ErrorType.NotFound, "Patient not found");

                    var freeRoom = await _roomRepository.GetFirstFreeRoom();
                    if (freeRoom is null) return Result<Unit>.Failure(ErrorType.NotFound, "No free room available");

                    freeRoom.Patients ??= new List<Patient>();
                    freeRoom.Patients.Add(patient);

                    var result = await _roomRepository.UpdateAsync(freeRoom);
                    if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to assign patient to room");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
