using Application.BaseValidators;
using Application.Movies;
using FluentValidation;

namespace Application.Reviews
{
    public class ReviewValidator : AbstractValidator<ReviewDto>
    {
        public ReviewValidator()
        {
            RuleFor(d => d.UserName).SetValidator(new NotNullValidator<ReviewDto, string>()).SetValidator(new ValidLengthValidator<ReviewDto, string>(4, 100));
            RuleFor(d => d.Rating).SetValidator(new NotNullValidator<ReviewDto, double>());

        }
    }
}
