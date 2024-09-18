using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Movies
{
    public class Create
    {
        public record CreateMovieCommand(MovieDto Movie) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateMovieCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Movie).SetValidator(new MovieValidator());
            }
        }

        public class CreateMovieCommandHandler(IMovieRepository _MovieRepository, IMapper _mapper) : IRequestHandler<CreateMovieCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateMovieCommand request, CancellationToken cancellationToken)
            {
                if (request.Movie is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var Movie = _mapper.Map<Movie>(request.Movie);
                if (Movie is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                Movie.CreatedAt = DateTime.Now;
                Movie.UpdatedAt = Movie.CreatedAt;

                var result = await _MovieRepository.CreateAsync(Movie);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the Movie! Try again.");

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
