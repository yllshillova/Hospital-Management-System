using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Employers
{
    public class Delete
    {
        public record DeleteStaffCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteStaffCommandHandler(IStaffRepository _staffRepository) : IRequestHandler<DeleteStaffCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteStaffCommand request, CancellationToken cancellationToken)
            {
                var staff = await _staffRepository.GetByIdAsync(request.Id);
                if (staff is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var result = await _staffRepository.DeleteAsync(staff);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the staff! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
