using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Visits
{
    public class Delete
    {
        public record DeleteVisitCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteVisitCommandHandler(IVisitRepository _visitRepository) : IRequestHandler<DeleteVisitCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteVisitCommand request, CancellationToken cancellationToken)
            {
                var visit = await _visitRepository.GetByIdAsync(request.Id);
                if (visit is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var result = await _visitRepository.DeleteAsync(visit);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the prescription! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
