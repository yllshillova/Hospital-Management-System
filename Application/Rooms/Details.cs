using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Rooms
{
    public class Details
    {
        public record GetRoomByIdQuery(Guid Id) : IRequest<Result<RoomDto>>;

        public class GetRoomByIdQueryHandler(IRoomRepository _roomRepository, IMapper _mapper) : IRequestHandler<GetRoomByIdQuery, Result<RoomDto>>
        {
            public async Task<Result<RoomDto>> Handle(GetRoomByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var room = await _roomRepository.GetByIdAsync(request.Id);
                    if (room is null) return Result<RoomDto>.Failure(ErrorType.NotFound, "No records could be found.");

                    var roomDto = _mapper.Map<RoomDto>(room);
                    if (roomDto is null) return Result<RoomDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                    return Result<RoomDto>.Success(roomDto);
                }
                return Result<RoomDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
