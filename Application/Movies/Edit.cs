using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Movies
{
    public class Edit
    {
        public record UpdateMovieCommand(MovieDto Movie) : IRequest<Result<Unit>>;

        public class UpdateMovieCommandValidator : AbstractValidator<UpdateMovieCommand>
        {
            public UpdateMovieCommandValidator()
            {
                RuleFor(x => x.Movie).SetValidator(new MovieValidator());
            }
        }

        public class UpdateMovieCommandHandler(IMovieRepository _MovieRepository, IMapper _mapper) : IRequestHandler<UpdateMovieCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateMovieCommand request, CancellationToken cancellationToken)
            {
                var Movie = await _MovieRepository.GetByIdAsync(request.Movie.Id);
                if (Movie is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                _mapper.Map(request.Movie, Movie);
                Movie.UpdatedAt = DateTime.Now;

                var result = await _MovieRepository.UpdateAsync(Movie);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the Movie. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
