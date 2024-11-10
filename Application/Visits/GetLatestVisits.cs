using Application.Core;
using Application.Visits;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Appointments
{
    public class GetLatestVisits
    {
        public record GetLatestVisitsQuery : IRequest<Result<IEnumerable<VisitDto>>>;

        public class GetLatestVisitsQueryHandler(IVisitRepository _visitRepository, IMapper _mapper) :
            IRequestHandler<GetLatestVisitsQuery, Result<IEnumerable<VisitDto>>>
        {

            public async Task<Result<IEnumerable<VisitDto>>> Handle(GetLatestVisitsQuery request, CancellationToken cancellationToken)
            {
                var visits = await _visitRepository.GetAllAsync();
                if (visits == null || !visits.Any()) return Result<IEnumerable<VisitDto>>.Failure(ErrorType.NotFound, "No visits found.");

                var latestVisits = visits.OrderByDescending(a => a.UpdatedAt).Take(3);
                var visitDtos = _mapper.Map<IEnumerable<VisitDto>>(latestVisits);

                return Result<IEnumerable<VisitDto>>.Success(visitDtos);
            }
        }
    }
}

