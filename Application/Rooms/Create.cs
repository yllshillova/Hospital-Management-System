using Application.Core;
using Application.Validators;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Rooms
{
    public class Create
    {
        public record CreateRoomCommand(RoomDto Room) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateRoomCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Room).SetValidator(new RoomValidator());
            }
        }

        public class CreateRoomCommandHandler(IRoomRepository _roomRepository, IMapper _mapper) : IRequestHandler<CreateRoomCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateRoomCommand request, CancellationToken cancellationToken)
            {
                if (request.Room is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again!");

                var room = _mapper.Map<Room>(request.Room);
                if (room is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                var result = await _roomRepository.CreateAsync(room);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the room. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
