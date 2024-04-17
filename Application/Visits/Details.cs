using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Visits
{
    public class Details
    {
        public record GetVisitByIdQuery(Guid Id) : IRequest<Result<VisitDto>>;

        public class GetVisitByIdQueryHandler(IVisitRepository _visitRepository, IMapper _mapper) : IRequestHandler<GetVisitByIdQuery, Result<VisitDto>>
        {
            public async Task<Result<VisitDto>> Handle(GetVisitByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var visit = await _visitRepository.GetByIdAsync(request.Id);
                    if (visit is null) return Result<VisitDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var visitDto = _mapper.Map<VisitDto>(visit);
                    if (visitDto is null) return Result<VisitDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<VisitDto>.Success(visitDto);
                }
                return Result<VisitDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
