using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Nurses
{
    public class Details
    {
        public record GetNurseByIdQuery(Guid Id) : IRequest<Result<NurseDto>>;

        public class GetDoctorByIdQueryHandler(INurseRepository _nurseRepository, IMapper _mapper) : IRequestHandler<GetNurseByIdQuery, Result<NurseDto>>
        {
            public async Task<Result<NurseDto>> Handle(GetNurseByIdQuery request, CancellationToken cancellationToken)
            {
                var nurse = await _nurseRepository.GetByIdAsync(request.Id);
                if (nurse is null) return Result<NurseDto>.Failure(ErrorType.NotFound, "No records could be found!");

                var nurseDto = _mapper.Map<NurseDto>(nurse);
                if (nurseDto is null) return Result<NurseDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<NurseDto>.Success(nurseDto);
            }
        }
    }
}
