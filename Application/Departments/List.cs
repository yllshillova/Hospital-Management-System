using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Departments
{
    public class List
    {
        public record GetDepartmentsQuery : IRequest<Result<IEnumerable<DepartmentDto>>>;

        public class GetDepartmentsQueryHandler(IDepartmentRepository _departmentRepository, IMapper _mapper) : IRequestHandler<GetDepartmentsQuery, Result<IEnumerable<DepartmentDto>>>
        {
            public async Task<Result<IEnumerable<DepartmentDto>>> Handle(GetDepartmentsQuery request, CancellationToken cancellationToken)
            {
                var departments = await _departmentRepository.GetAllAsync();
                if (departments is null || !departments.Any()) return Result<IEnumerable<DepartmentDto>>.Failure(ErrorType.NotFound, "No department records found in the hospital");

                var departmentDtos = _mapper.Map<IEnumerable<DepartmentDto>>(departments);
                if (departmentDtos is null) return Result<IEnumerable<DepartmentDto>>.Failure(ErrorType.BadRequest, "Problem while mapping between entity/dto.");

                return Result<IEnumerable<DepartmentDto>>.Success(departmentDtos);

            }

        }
    }
}
