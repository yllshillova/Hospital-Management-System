using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using MediatR;

namespace Application.Accounts.Users
{
    public class GetStaff
    {
        public record GetStaffQuery : IRequest<Result<IEnumerable<AppUser>>>;

        public class GetStaffHandler(IDoctorRepository _doctorRepository, INurseRepository _nurseRepository, IMapper _mapper) : IRequestHandler<GetStaffQuery, Result<IEnumerable<AppUser>>>
        {
            public async Task<Result<IEnumerable<AppUser>>> Handle(GetStaffQuery request, CancellationToken cancellationToken)
            {
                var doctors = await _doctorRepository.GetAllAsync();
                if (doctors is null || !doctors.Any()) return Result<IEnumerable<AppUser>>.Failure(ErrorType.NotFound, "No doctor could be found!");

                var nurses = await _nurseRepository.GetAllAsync();
                if (doctors is null || !doctors.Any()) return Result<IEnumerable<AppUser>>.Failure(ErrorType.NotFound, "No nurse could be found!");

                IEnumerable<AppUser> staff = doctors.Cast<AppUser>().Concat(nurses);
                if (staff is null || !staff.Any())
                    return Result<IEnumerable<AppUser>>.Failure(ErrorType.NotFound, "No staff found.");

                var staffDto = _mapper.Map<IEnumerable<AppUser>>(staff);
                if (staffDto is null) return Result<IEnumerable<AppUser>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<AppUser>>.Success(staffDto);
            }
        }
    }
}
