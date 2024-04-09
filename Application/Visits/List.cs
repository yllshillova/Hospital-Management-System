using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Visits
{
    public class List
    {
        public record GetVisitsQuery : IRequest<Result<IEnumerable<VisitDto>>>;

        public class GetVisitsQueryHandler(IVisitRepository _visitRepository, IMapper _mapper) : IRequestHandler<GetVisitsQuery, Result<IEnumerable<VisitDto>>>
        {
            public async Task<Result<IEnumerable<VisitDto>>> Handle(GetVisitsQuery request, CancellationToken cancellationToken)
            {
                var visits = await _visitRepository.GetAllAsync();
                if (visits is null || !visits.Any()) return Result<IEnumerable<VisitDto>>.Failure(ErrorType.NotFound, "No records could be found!");

                var visitDtos = _mapper.Map<IEnumerable<VisitDto>>(visits);
                if (visitDtos is null) return Result<IEnumerable<VisitDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<VisitDto>>.Success(visitDtos);
            }
        }

    }
}
