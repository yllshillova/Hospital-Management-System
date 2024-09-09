using Application.Contracts;
using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Books
{
    public class Edit
    {
        public record UpdateBookCommand(BookDto Book) : IRequest<Result<Unit>>;

        public class UpdateBookCommandValidator : AbstractValidator<UpdateBookCommand>
        {
            public UpdateBookCommandValidator()
            {
                RuleFor(x => x.Book).SetValidator(new BookValidator());
            }
        }

        public class UpdateBookCommandHandler(IBookRepository _bookRepository, IMapper _mapper) : IRequestHandler<UpdateBookCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateBookCommand request, CancellationToken cancellationToken)
            {
                var book = await _bookRepository.GetByIdAsync(request.Book.Id);
                if (book is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                _mapper.Map(request.Book, book);
                book.UpdatedAt = DateTime.Now;

                var result = await _bookRepository.UpdateAsync(book);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the order. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
