using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Rooms
{
    public class Edit
    {
        public record UpdateRoomCommand(RoomDto Room) : IRequest<Result<Unit>>;
        public class UpdateRoomCommandValidator : AbstractValidator<UpdateRoomCommand>
        {
            public UpdateRoomCommandValidator()
            {
                RuleFor(x => x.Room).SetValidator(new RoomValidator());
            }
        }
        public class UpdateRoomCommandHandler(IRoomRepository _roomRepository, IMapper _mapper) : IRequestHandler<UpdateRoomCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateRoomCommand request, CancellationToken cancellationToken)
            {
                var room = await _roomRepository.GetByIdAsync(request.Room.Id);
                if (room == null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                _mapper.Map(request.Room, room);
                room.UpdatedAt = DateTime.Now;

                var result = await _roomRepository.UpdateAsync(room);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the room. Try again!");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
