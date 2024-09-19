using Application.Core;
using Domain.Contracts;
using Domain.Entities;
using MediatR;

namespace Application.Departments
{
    public class Details
    {
        public record GetDepartmentByIdQuery(Guid Id) : IRequest<Result<DepartmentDto>>;
        public class GetDepartmentByIdQueryHandler(IDepartmentRepository _departmentRepository, IDoctorRepository _doctorRepository,
            INurseRepository _nurseRepository) : IRequestHandler<GetDepartmentByIdQuery, Result<DepartmentDto>>
        {
            public async Task<Result<DepartmentDto>> Handle(GetDepartmentByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var department = await _departmentRepository.GetByIdAsync(request.Id);
                    if (department is null) return Result<DepartmentDto>.Failure(ErrorType.NotFound, "No records could be found.");

                    var doctors = await _doctorRepository.GetDoctorsByDepartmentIdAsync(request.Id);
                    var nurses = await _nurseRepository.GetNursesByDepartmentIdAsync(request.Id);

                    if ((doctors == null || !doctors.Any()) && (nurses == null || !nurses.Any()))
                    {
                        return Result<DepartmentDto>.Failure(ErrorType.NotFound, "No doctors or nurses found on this department");
                    }

                    var staff = new List<AppUser>();
                    if (doctors != null) staff.AddRange(doctors);
                    if (nurses != null) staff.AddRange(nurses);

                    var departmentDto = new DepartmentDto
                    {
                        Id = department.Id,
                        Name = department.Name,
                        IsDeleted = department.IsDeleted,
                        Staff = staff
                    };

                    return Result<DepartmentDto>.Success(departmentDto);

                }
                return Result<DepartmentDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
