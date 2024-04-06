using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Employers
{
    public class List
    {
        public record GetStaffQuery : IRequest<Result<IEnumerable<StaffDto>>>;

        public class GetStaffQueryHandler(IStaffRepository _staffRepository, IMapper _mapper) : IRequestHandler<GetStaffQuery, Result<IEnumerable<StaffDto>>>
        {
            public async Task<Result<IEnumerable<StaffDto>>> Handle(GetStaffQuery request, CancellationToken cancellationToken)
            {
                var staff = await _staffRepository.GetAllAsync();
                if (staff is null || !staff.Any()) return Result<IEnumerable<StaffDto>>.Failure(ErrorType.NotFound, "No records could be found!");

                var staffDtos = _mapper.Map<IEnumerable<StaffDto>>(staff);
                if (staffDtos is null) return Result<IEnumerable<StaffDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<StaffDto>>.Success(staffDtos);
            }
        }

    }
}
