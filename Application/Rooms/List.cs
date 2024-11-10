using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Rooms
{
    public class List
    {
        public record GetRoomsQuery : IRequest<Result<IEnumerable<RoomDto>>>;

        public class GetRoomsQueryHandler(IRoomRepository _roomRepository, IMapper _mapper) : IRequestHandler<GetRoomsQuery, Result<IEnumerable<RoomDto>>>
        {
            public async Task<Result<IEnumerable<RoomDto>>> Handle(GetRoomsQuery request, CancellationToken cancellation)
            {
                var rooms = await _roomRepository.GetAllAsync(r => r.Patients);
                if (rooms is null) return Result<IEnumerable<RoomDto>>.Failure(ErrorType.BadRequest, "Failed to retrieve rooms");

                if (!rooms.Any()) return Result<IEnumerable<RoomDto>>.Failure(ErrorType.NotFound, "No room records found in the hospital");

                var roomDtos = _mapper.Map<IEnumerable<RoomDto>>(rooms);
                if (roomDtos is null) return Result<IEnumerable<RoomDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto");

                return Result<IEnumerable<RoomDto>>.Success(roomDtos);
            }

        }
    }
}
