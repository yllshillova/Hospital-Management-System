using Application.Contracts;
using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Renovations
{
    public class List
    {
        public record GetRenovationsQuery : IRequest<Result<IEnumerable<RenovationDto>>>;

        public class GetRenovationsQueryHandler(IRenovationRepository _RenovationRepository, IMapper _mapper) : IRequestHandler<GetRenovationsQuery, Result<IEnumerable<RenovationDto>>>
        {
            public async Task<Result<IEnumerable<RenovationDto>>> Handle(GetRenovationsQuery request, CancellationToken cancellationToken)
            {
                var Renovations = await _RenovationRepository.GetAllAsync();
                if (Renovations is null || !Renovations.Any()) return Result<IEnumerable<RenovationDto>>.Failure(ErrorType.NotFound, "No Renovation records found");

                var RenovationDtos = _mapper.Map<IEnumerable<RenovationDto>>(Renovations);
                if (RenovationDtos is null) return Result<IEnumerable<RenovationDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<RenovationDto>>.Success(RenovationDtos);
            }
        }

    }
}
