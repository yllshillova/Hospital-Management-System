using Application.Core;
using Domain.Contracts;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Rooms
{
    public class Delete
    {
        public record DeleteRoomCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteRoomCommandHandler : IRequestHandler<DeleteRoomCommand, Result<Unit>>
        {
            private readonly IRoomRepository _roomRepository;
            private readonly DataContext _context;

            // Constructor fixed: Now correctly initializes both _context and _roomRepository
            public DeleteRoomCommandHandler(DataContext context, IRoomRepository roomRepository)
            {
                _context = context;
                _roomRepository = roomRepository;
            }

            //public async Task<Result<Unit>> Handle(DeleteRoomCommand request, CancellationToken cancellationToken)
            //{
            //    var room = await _roomRepository.GetByIdAsync(request.Id);
            //    if (room is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");


            //    var result = await _roomRepository.DeleteAsync(room);
            //    if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the room! Try again.");
            //    return Result<Unit>.Success(Unit.Value);

            //}

            public async Task<Result<Unit>> Handle(DeleteRoomCommand request, CancellationToken cancellationToken)
            {
                //var room = await _roomRepository.GetByIdAsync(request.Id);
                var room = await _context.Rooms.Include(x=>x.RoomPatients).Where(x=>x.Id == request.Id).FirstOrDefaultAsync();
                if (room is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                if(room.RoomPatients.Count() >= 1) return Result<Unit>.Failure(ErrorType.NotFound, "Room has patients!");

                var result = await _roomRepository.DeleteAsync(room);
                //var result = false;
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the room! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
