using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Satellites
{
    public class List
    {
        public record GetSatellitesQuery : IRequest<Result<IEnumerable<SatelliteDto>>>;

        public class GetSatelliteQueryHandler(ISatelliteRepository _satelliteRepository, IMapper _mapper) : IRequestHandler<GetSatellitesQuery, Result<IEnumerable<SatelliteDto>>>
        {
            public async Task<Result<IEnumerable<SatelliteDto>>> Handle(GetSatellitesQuery request, CancellationToken cancellationToken)
            {
                var satellites = await _satelliteRepository.GetAllAsync();
                if (satellites is null || !satellites.Any()) return Result<IEnumerable<SatelliteDto>>.Failure(ErrorType.NotFound, "No Satellite records found");

                var satelliteDtos = _mapper.Map<IEnumerable<SatelliteDto>>(satellites);
                if (satelliteDtos is null) return Result<IEnumerable<SatelliteDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<SatelliteDto>>.Success(satelliteDtos);
            }
        }

    }
}
