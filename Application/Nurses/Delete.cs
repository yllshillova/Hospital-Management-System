using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Nurses
{
    public class Delete
    {
        public record DeleteNurseCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteNurseCommandHandler(INurseRepository _nurseRepository) : IRequestHandler<DeleteNurseCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteNurseCommand request, CancellationToken cancellationToken)
            {
                var nurse = await _nurseRepository.GetByIdAsync(request.Id);
                if (nurse is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var result = await _nurseRepository.DeleteAsync(nurse);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the nurse! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
