using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Rooms
{
    public class Delete
    {
        public record DeleteRoomCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteRoomCommandHandler(IRoomRepository _roomRepository) : IRequestHandler<DeleteRoomCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteRoomCommand request, CancellationToken cancellationToken)
            {
                //var room = await _roomRepository.GetByIdAsync(request.Id);
                var room = await _roomRepository.GetByIdWithPatientsAsync(request.Id);
                if (room is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                if (room.Patients.Count() >= 1) return Result<Unit>.Failure(ErrorType.NotFound, "Room has patients!");

                var result = await _roomRepository.DeleteAsync(room);
                //var result = false;
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the room! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
