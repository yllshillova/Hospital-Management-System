using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Renovations
{
    public class Details
    {
        public record GetRenovationByIdQuery(Guid Id) : IRequest<Result<RenovationDto>>;

        public class GetRenovationByIdQueryHandler(IRenovationRepository _RenovationRepository, IMapper _mapper) : IRequestHandler<GetRenovationByIdQuery, Result<RenovationDto>>
        {
            public async Task<Result<RenovationDto>> Handle(GetRenovationByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var Renovation = await _RenovationRepository.GetByIdAsync(request.Id);
                    if (Renovation is null) return Result<RenovationDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var RenovationDto = _mapper.Map<RenovationDto>(Renovation);
                    if (RenovationDto is null) return Result<RenovationDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<RenovationDto>.Success(RenovationDto);
                }
                return Result<RenovationDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
