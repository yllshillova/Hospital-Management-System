using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Movies
{
    public class List
    {
        public record GetMoviesQuery : IRequest<Result<IEnumerable<MovieDto>>>;

        public class GetMovieQueryHandler(IMovieRepository _MovieRepository, IMapper _mapper) : IRequestHandler<GetMoviesQuery, Result<IEnumerable<MovieDto>>>
        {
            public async Task<Result<IEnumerable<MovieDto>>> Handle(GetMoviesQuery request, CancellationToken cancellationToken)
            {
                var Movies = await _MovieRepository.GetAllAsync();
                if (Movies is null || !Movies.Any()) return Result<IEnumerable<MovieDto>>.Failure(ErrorType.NotFound, "No Movie records found");

                var MovieDtos = _mapper.Map<IEnumerable<MovieDto>>(Movies);
                if (MovieDtos is null) return Result<IEnumerable<MovieDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<MovieDto>>.Success(MovieDtos);
            }
        }

    }
}
