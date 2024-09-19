using Application.BaseValidators;
using FluentValidation;

namespace Application.Movies
{
    public class MovieValidator : AbstractValidator<MovieDto>
    {
        public MovieValidator()
        {
            RuleFor(d => d.Title).SetValidator(new NotNullValidator<MovieDto, string>()).SetValidator(new ValidLengthValidator<MovieDto, string>(4, 100));
            RuleFor(d => d.Genre).SetValidator(new NotNullValidator<MovieDto, string>()).SetValidator(new ValidLengthValidator<MovieDto, string>(4, 100));

        }
    }
}
