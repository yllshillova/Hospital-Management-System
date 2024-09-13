using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Sculptors
{
    public class List
    {
        public record GetSculptorsQuery : IRequest<Result<IEnumerable<SculptorDto>>>;

        public class GetSculptorQueryHandler(ISculptorRepository _SculptorRepository, IMapper _mapper) : IRequestHandler<GetSculptorsQuery, Result<IEnumerable<SculptorDto>>>
        {
            public async Task<Result<IEnumerable<SculptorDto>>> Handle(GetSculptorsQuery request, CancellationToken cancellationToken)
            {
                var Sculptors = await _SculptorRepository.GetAllAsync();
                if (Sculptors is null || !Sculptors.Any()) return Result<IEnumerable<SculptorDto>>.Failure(ErrorType.NotFound, "No Sculptor records found");

                var SculptorDtos = _mapper.Map<IEnumerable<SculptorDto>>(Sculptors);
                if (SculptorDtos is null) return Result<IEnumerable<SculptorDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<SculptorDto>>.Success(SculptorDtos);
            }
        }

    }
}
