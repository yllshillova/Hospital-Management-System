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
                var room = await _roomRepository.GetByIdAsync(request.Id);
                if (room is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                room.IsFree = true;
                var result = await _roomRepository.DeleteAsync(room);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the room! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
