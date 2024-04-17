using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;
using Microsoft.IdentityModel.Tokens;

namespace Application.Departments
{
    public class Details
    {
        public record GetDepartmentByIdQuery(Guid Id) : IRequest<Result<DepartmentDto>>;

        public class GetDepartmentByIdQueryHandler(IDepartmentRepository _departmentRepository, IMapper _mapper) : IRequestHandler<GetDepartmentByIdQuery, Result<DepartmentDto>>
        {
            public async Task<Result<DepartmentDto>> Handle(GetDepartmentByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var department = await _departmentRepository.GetByIdAsync(request.Id);
                    if (department is null) return Result<DepartmentDto>.Failure(ErrorType.NotFound, "No records could be found.");

                    var departmentDto = _mapper.Map<DepartmentDto>(department);
                    if (departmentDto is null) return Result<DepartmentDto>.Failure(ErrorType.NotFound, "Problem while mapping between entities/dto");

                    return Result<DepartmentDto>.Success(departmentDto);

                }
                return Result<DepartmentDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
