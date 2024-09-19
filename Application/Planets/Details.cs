using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Planets
{
    public class Details
    {
        public record GetPlanetByIdQuery(Guid Id) : IRequest<Result<PlanetDto>>;

        public class GetPlanetByIdQueryHandler(IPlanetRepository _planetRepository, IMapper _mapper) : IRequestHandler<GetPlanetByIdQuery, Result<PlanetDto>>
        {
            public async Task<Result<PlanetDto>> Handle(GetPlanetByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var planet = await _planetRepository.GetByIdAsync(request.Id);
                    if (planet is null) return Result<PlanetDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var planetDto = _mapper.Map<PlanetDto>(planet);
                    if (planetDto is null) return Result<PlanetDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<PlanetDto>.Success(planetDto);
                }
                return Result<PlanetDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
