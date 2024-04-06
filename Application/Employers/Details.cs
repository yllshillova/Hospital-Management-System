using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Employers
{
    public class Details
    {
        public record GetStaffByIdQuery(Guid Id) : IRequest<Result<StaffDto>>;

        public class GetStaffByIdQueryHandler(IStaffRepository _staffRepository, IMapper _mapper) : IRequestHandler<GetStaffByIdQuery, Result<StaffDto>>
        {
            public async Task<Result<StaffDto>> Handle(GetStaffByIdQuery request, CancellationToken cancellationToken)
            {
                var staff = await _staffRepository.GetByIdAsync(request.Id);
                if (staff is null) return Result<StaffDto>.Failure(ErrorType.NotFound, "No records could be found!");

                var staffDto = _mapper.Map<StaffDto>(staff);
                if (staffDto is null) return Result<StaffDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<StaffDto>.Success(staffDto);
            }
        }
    }
}
