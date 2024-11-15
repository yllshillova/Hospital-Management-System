﻿using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Departments
{
    public class Delete
    {
        public record DeleteDepartmentCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteDepartmentHandler(IDepartmentRepository _departmentRepository) : IRequestHandler<DeleteDepartmentCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteDepartmentCommand request, CancellationToken cancellationToken)
            {
                var department = await _departmentRepository.GetByIdAsync(request.Id);
                if (department is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                if (department.IsDeleted == true) return Result<Unit>.Failure(ErrorType.BadRequest, "Cannot delete the deactivated department!");


                department.IsDeleted = true;
                var result = await _departmentRepository.UpdateAsync(department); 
                
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the department. Try again!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
