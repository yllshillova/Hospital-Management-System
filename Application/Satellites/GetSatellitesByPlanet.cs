using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Satellites
{
    public class GetSatellitesByPlanet
    {
        public record GetSatellitesByPlanetNameQuery(string PlanetName) : IRequest<Result<IEnumerable<SatelliteDto>>>;

        public class GetScheduledAppointmentsQueryHandler(ISatelliteRepository _satelliteRepository, IMapper _mapper) : IRequestHandler<GetSatellitesByPlanetNameQuery, Result<IEnumerable<SatelliteDto>>>
        {
            public async Task<Result<IEnumerable<SatelliteDto>>> Handle(GetSatellitesByPlanetNameQuery request, CancellationToken cancellationToken)
            {
                if (request.PlanetName != null)
                {

                    var satellites = await _satelliteRepository.GetSatellitesByPlanetNameAsync(request.PlanetName);
                    if (satellites == null || !satellites.Any()) return Result<IEnumerable<SatelliteDto>>.Failure(ErrorType.NotFound, "No satellite records found for the employee");

                    var satelliteDtos = _mapper.Map<IEnumerable<SatelliteDto>>(satellites);
                    if (satelliteDtos is null) return Result<IEnumerable<SatelliteDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto");

                    return Result<IEnumerable<SatelliteDto>>.Success(satelliteDtos);
                }
                return Result<IEnumerable<SatelliteDto>>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
