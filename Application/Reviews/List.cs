using Application.Core;
using Application.Movies;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Reviews
{
    public class List
    {
        public record GetReviewsQuery : IRequest<Result<IEnumerable<ReviewDto>>>;

        public class GetReviewQueryHandler(IReviewRepository _ReviewRepository, IMapper _mapper) : IRequestHandler<GetReviewsQuery, Result<IEnumerable<ReviewDto>>>
        {
            public async Task<Result<IEnumerable<ReviewDto>>> Handle(GetReviewsQuery request, CancellationToken cancellationToken)
            {
                var Reviews = await _ReviewRepository.GetAllAsync();
                if (Reviews is null || !Reviews.Any()) return Result<IEnumerable<ReviewDto>>.Failure(ErrorType.NotFound, "No Review records found");

                var ReviewDtos = _mapper.Map<IEnumerable<ReviewDto>>(Reviews);
                if (ReviewDtos is null) return Result<IEnumerable<ReviewDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<ReviewDto>>.Success(ReviewDtos);
            }
        }

    }
}
