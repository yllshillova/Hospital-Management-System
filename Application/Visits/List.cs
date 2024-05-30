using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using MediatR;

namespace Application.Visits
{
    public class List
    {
        public record GetVisitsQuery(Guid? doctorId) : IRequest<Result<IEnumerable<VisitDto>>>;

        public class GetVisitsQueryHandler(IVisitRepository _visitRepository, IDoctorRepository _doctorRepository, IMapper _mapper) : IRequestHandler<GetVisitsQuery, Result<IEnumerable<VisitDto>>>
        {
            public async Task<Result<IEnumerable<VisitDto>>> Handle(GetVisitsQuery request, CancellationToken cancellationToken)
            {
                IEnumerable<Visit> visits;

                if (request.doctorId.HasValue)
                {
                    var doctor = await _doctorRepository.GetByIdAsync(request.doctorId.Value);
                    if (doctor != null)
                    {
                        visits = await _visitRepository.GetVisitsByDoctorIdAsync(request.doctorId.Value);
                    }
                    else
                    {
                        visits = await _visitRepository.GetAllAsync();
                    }
                }
                else
                {
                    visits = await _visitRepository.GetAllAsync();
                }

                if (visits is null || !visits.Any())
                    return Result<IEnumerable<VisitDto>>.Failure(ErrorType.NotFound, "No records could be found!");

                var visitDtos = _mapper.Map<IEnumerable<VisitDto>>(visits);
                if (visitDtos is null)
                    return Result<IEnumerable<VisitDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<VisitDto>>.Success(visitDtos);
            }
        }

    }
}
