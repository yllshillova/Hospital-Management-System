using Application.BaseValidators;
using Application.Contracts;
using FluentValidation;

namespace Application.Books
{
    public class BookValidator : AbstractValidator<BookDto>
    {
        public BookValidator()
        {
            RuleFor(d => d.Genre).SetValidator(new NotNullValidator<BookDto, string>());
            RuleFor(d => d.Title).SetValidator(new NotNullValidator<BookDto, string>());
            RuleFor(d => d.AuthorId).SetValidator(new NotNullValidator<BookDto, Guid>());

        }

    }
}
