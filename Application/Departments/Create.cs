using Application.Core;
using Application.BaseValidators;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Departments
{
    public class Create
    {
        public record CreateDepartmentCommand(DepartmentDto Department) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateDepartmentCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Department).SetValidator(new DepartmentValidator());
            }
        }

        public class CreateDepartmentCommandHandler(IDepartmentRepository _departmentRepository, IMapper _mapper) : IRequestHandler<CreateDepartmentCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateDepartmentCommand request, CancellationToken cancellationToken)
            {
                if (request.Department is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var department = _mapper.Map<Department>(request.Department);
                if (department is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                var result = await _departmentRepository.CreateAsync(department);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the department! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
