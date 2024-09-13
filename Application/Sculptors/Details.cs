using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Sculptors
{
    public class Details
    {
        public record GetSculptorByIdQuery(Guid Id) : IRequest<Result<SculptorDto>>;

        public class GetSculptorByIdQueryHandler(ISculptorRepository _SculptorRepository, IMapper _mapper) : IRequestHandler<GetSculptorByIdQuery, Result<SculptorDto>>
        {
            public async Task<Result<SculptorDto>> Handle(GetSculptorByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var Sculptor = await _SculptorRepository.GetByIdAsync(request.Id);
                    if (Sculptor is null) return Result<SculptorDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var SculptorDto = _mapper.Map<SculptorDto>(Sculptor);
                    if (SculptorDto is null) return Result<SculptorDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<SculptorDto>.Success(SculptorDto);
                }
                return Result<SculptorDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
