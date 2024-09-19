using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using MediatR;

namespace Application.Renovations
{
    public class List
    {
        public record GetRenovationsQuery(string? Location) : IRequest<Result<IEnumerable<RenovationDto>>>;

        public class GetRenovationQueryHandler(IRenovationRepository _RenovationRepository, IMapper _mapper) : IRequestHandler<GetRenovationsQuery, Result<IEnumerable<RenovationDto>>>
        {
            public async Task<Result<IEnumerable<RenovationDto>>> Handle(GetRenovationsQuery request, CancellationToken cancellationToken)
            {
                IEnumerable<Renovation> renovations;

                if (!string.IsNullOrEmpty(request.Location))
                {
                    renovations = await _RenovationRepository.GetByLocationAsync(request.Location);
                }

                else
                {
                    renovations = await _RenovationRepository.GetAllAsync();
                }

                if (renovations is null || !renovations.Any())
                {
                    return Result<IEnumerable<RenovationDto>>.Failure(ErrorType.NotFound, "No renovation records found");
                }

                var RenovationDtos = _mapper.Map<IEnumerable<RenovationDto>>(renovations);
                if (RenovationDtos is null) return Result<IEnumerable<RenovationDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<RenovationDto>>.Success(RenovationDtos);
            }
        }

    }
}
