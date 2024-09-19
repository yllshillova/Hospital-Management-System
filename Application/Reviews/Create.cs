using Application.Core;
using Application.Movies;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Reviews
{
    public class Create
    {
        public record CreateReviewCommand(ReviewDto Review) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateReviewCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Review).SetValidator(new ReviewValidator());
            }
        }

        public class CreateReviewCommandHandler(IReviewRepository _ReviewRepository, IMapper _mapper) : IRequestHandler<CreateReviewCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
            {
                if (request.Review is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var Review = _mapper.Map<Review>(request.Review);
                if (Review is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                Review.CreatedAt = DateTime.Now;
                Review.UpdatedAt = Review.CreatedAt;

                var result = await _ReviewRepository.CreateAsync(Review);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the Review! Try again.");

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
