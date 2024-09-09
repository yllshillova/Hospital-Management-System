using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Employees
{
    public class List
    {
        public record GetEmployeesQuery : IRequest<Result<IEnumerable<EmployeeDto>>>;

        public class GetEmployeeQueryHandler(IEmployeeRepository _employeeRepository, IMapper _mapper) : IRequestHandler<GetEmployeesQuery, Result<IEnumerable<EmployeeDto>>>
        {
            public async Task<Result<IEnumerable<EmployeeDto>>> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
            {
                var employees = await _employeeRepository.GetAllAsync();
                if (employees is null || !employees.Any()) return Result<IEnumerable<EmployeeDto>>.Failure(ErrorType.NotFound, "No employee records found");

                var employeeDtos = _mapper.Map<IEnumerable<EmployeeDto>>(employees);
                if (employeeDtos is null) return Result<IEnumerable<EmployeeDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<EmployeeDto>>.Success(employeeDtos);
            }
        }

    }
}
