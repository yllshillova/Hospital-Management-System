using Application.Contracts;
using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Books
{
    public class Create
    {
        public record CreateBookCommand(BookDto Book) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateBookCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Book).SetValidator(new BookValidator());
            }
        }

        public class CreateOrderCommandHandler(IBookRepository _bookRepository, IMapper _mapper) : IRequestHandler<CreateBookCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateBookCommand request, CancellationToken cancellationToken)
            {
                if (request.Book is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var book = _mapper.Map<Book>(request.Book);
                if (book is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                book.CreatedAt = DateTime.Now;
                book.UpdatedAt = book.CreatedAt;

                var result = await _bookRepository.CreateAsync(book);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the book! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
