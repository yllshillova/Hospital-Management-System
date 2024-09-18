using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Reviews
{
    public class Delete
    {
        public record DeleteReviewCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteReviewCommandHandler(IReviewRepository _ReviewRepository) : IRequestHandler<DeleteReviewCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
            {
                var Review = await _ReviewRepository.GetByIdAsync(request.Id);
                if (Review is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var result = await _ReviewRepository.DeleteAsync(Review);

                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the Review! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
