using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Planets
{
    public class List
    {
        public record GetPlanetsQuery : IRequest<Result<IEnumerable<PlanetDto>>>;

        public class GetPlanetQueryHandler(IPlanetRepository _planetRepository, IMapper _mapper) : IRequestHandler<GetPlanetsQuery, Result<IEnumerable<PlanetDto>>>
        {
            public async Task<Result<IEnumerable<PlanetDto>>> Handle(GetPlanetsQuery request, CancellationToken cancellationToken)
            {
                var planets = await _planetRepository.GetAllAsync();
                if (planets is null || !planets.Any()) return Result<IEnumerable<PlanetDto>>.Failure(ErrorType.NotFound, "No Planet records found");

                var planetDtos = _mapper.Map<IEnumerable<PlanetDto>>(planets);
                if (planetDtos is null) return Result<IEnumerable<PlanetDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<PlanetDto>>.Success(planetDtos);
            }
        }

    }
}
