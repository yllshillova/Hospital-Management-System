using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Rooms
{
    public class GetRoomPatients
    {
        public record GetRoomPatientsByIdQuery(Guid Id) : IRequest<Result<List<PatientInRoomDto>>>;

        public class GetRoomPatientsByIdQueryHandler(IRoomRepository _roomRepository, IMapper _mapper, DataContext _context) : IRequestHandler<GetRoomPatientsByIdQuery, Result<List<PatientInRoomDto>>>
        {
            public async Task<Result<List<PatientInRoomDto>>> Handle(GetRoomPatientsByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var room = await _context.RoomPatients.Include(x => x.Patient).Where(x => x.RoomId == request.Id).ToListAsync();
                    //if (room is null) return Result<PatientInRoomDto>.Failure(ErrorType.NotFound, "No records could be found.");

                    //var roomDto = _mapper.Map<PatientInRoomDto>(room);

                    List<PatientInRoomDto> roomDto = room.Select(x => new PatientInRoomDto
                    {
                        FirstName = x.Patient.Name,
                        LastName = x.Patient.LastName
                    }).ToList();

                    if (roomDto is null) return Result<List<PatientInRoomDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                    return Result<List<PatientInRoomDto>>.Success(roomDto);
                }
                return Result<List<PatientInRoomDto>>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }

}
