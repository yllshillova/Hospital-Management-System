using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Movies
{
    public class Details
    {
        public record GetMovieByIdQuery(Guid Id) : IRequest<Result<MovieDto>>;

        public class GetMovieByIdQueryHandler(IMovieRepository _MovieRepository, IMapper _mapper) : IRequestHandler<GetMovieByIdQuery, Result<MovieDto>>
        {
            public async Task<Result<MovieDto>> Handle(GetMovieByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var Movie = await _MovieRepository.GetByIdAsync(request.Id);
                    if (Movie is null) return Result<MovieDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var MovieDto = _mapper.Map<MovieDto>(Movie);
                    if (MovieDto is null) return Result<MovieDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<MovieDto>.Success(MovieDto);
                }
                return Result<MovieDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
