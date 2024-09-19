using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Employees
{
    public class Create
    {
        public record CreateEmployeeCommand(EmployeeDto Employee) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateEmployeeCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Employee).SetValidator(new EmployeeValidator());
            }
        }

        public class CreateEmployeeCommandHandler(IEmployeeRepository _employeeRepository, IMapper _mapper) : IRequestHandler<CreateEmployeeCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
            {
                if (request.Employee is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var employee = _mapper.Map<Employee>(request.Employee);
                if (employee is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                employee.CreatedAt = DateTime.Now;
                employee.UpdatedAt = employee.CreatedAt;

                var result = await _employeeRepository.CreateAsync(employee);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the employee! Try again.");

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
