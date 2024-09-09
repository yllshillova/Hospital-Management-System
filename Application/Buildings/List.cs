using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Buildings
{
    public class List
    {
        public record GetBuildingsQuery : IRequest<Result<IEnumerable<BuildingDto>>>;

        public class GetBuildingsQueryHandler(IBuildingRepository _BuildingRepository, IMapper _mapper) : IRequestHandler<GetBuildingsQuery, Result<IEnumerable<BuildingDto>>>
        {
            public async Task<Result<IEnumerable<BuildingDto>>> Handle(GetBuildingsQuery request, CancellationToken cancellationToken)
            {
                var Buildings = await _BuildingRepository.GetAllAsync();
                if (Buildings is null || !Buildings.Any()) return Result<IEnumerable<BuildingDto>>.Failure(ErrorType.NotFound, "No employee records found");

                var BuildingDtos = _mapper.Map<IEnumerable<BuildingDto>>(Buildings);
                if (BuildingDtos is null) return Result<IEnumerable<BuildingDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<BuildingDto>>.Success(BuildingDtos);
            }
        }

    }
}
