using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Renovations
{
    public class Delete
    {
        public record DeleteRenovationCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteRenovationCommandHandler(IRenovationRepository _RenovationRepository) : IRequestHandler<DeleteRenovationCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteRenovationCommand request, CancellationToken cancellationToken)
            {
                var Renovation = await _RenovationRepository.GetByIdAsync(request.Id);
                if (Renovation is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var result = await _RenovationRepository.DeleteAsync(Renovation);

                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the Renovation! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
