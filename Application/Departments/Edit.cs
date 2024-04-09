using Application.Core;
using Application.BaseValidators;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Departments
{
    public class Edit
    {
        public record UpdateDepartmentCommand(DepartmentDto Department) : IRequest<Result<Unit>>;

        public class UpdateDepartmentCommandValidator : AbstractValidator<UpdateDepartmentCommand>
        {
            public UpdateDepartmentCommandValidator()
            {
                RuleFor(x => x.Department).SetValidator(new DepartmentValidator());
            }
        }

        public class UpdateDepartmentCommandHandler(IDepartmentRepository _departmentRepository, IMapper _mapper) : IRequestHandler<UpdateDepartmentCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateDepartmentCommand request, CancellationToken cancellationToken)
            {
                var department = await _departmentRepository.GetByIdAsync(request.Department.Id);
                if (department is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                _mapper.Map(request.Department, department);
                department.UpdatedAt = DateTime.Now;

                var result = await _departmentRepository.UpdateAsync(department);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the department. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
