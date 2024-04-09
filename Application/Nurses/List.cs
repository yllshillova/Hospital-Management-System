using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Nurses
{
    public class List
    {
        public record GetNursesQuery : IRequest<Result<IEnumerable<NurseDto>>>;

        public class GetNursesQueryHandler(INurseRepository _nurseRepository, IMapper _mapper) : IRequestHandler<GetNursesQuery, Result<IEnumerable<NurseDto>>>
        {
            public async Task<Result<IEnumerable<NurseDto>>> Handle(GetNursesQuery request, CancellationToken cancellationToken)
            {
                var nurses = await _nurseRepository.GetAllAsync();
                if (nurses is null || !nurses.Any()) return Result<IEnumerable<NurseDto>>.Failure(ErrorType.NotFound, "No records could be found!");

                var nurseDtos = _mapper.Map<IEnumerable<NurseDto>>(nurses);
                if (nurseDtos is null) return Result<IEnumerable<NurseDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<NurseDto>>.Success(nurseDtos);
            }
        }

    }
}
