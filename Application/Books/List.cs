using Application.Contracts;
using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Books
{
    public class List
    {
        public record GetBooksQuery : IRequest<Result<IEnumerable<BookDto>>>;

        public class GetBooksQueryHandler(IBookRepository _booksRepository, IMapper _mapper) : IRequestHandler<GetBooksQuery, Result<IEnumerable<BookDto>>>
        {
            public async Task<Result<IEnumerable<BookDto>>> Handle(GetBooksQuery request, CancellationToken cancellationToken)
            {
                var books = await _booksRepository.GetAllAsync();
                if (books is null || !books.Any()) return Result<IEnumerable<BookDto>>.Failure(ErrorType.NotFound, "No book records found");

                var booksDtos = _mapper.Map<IEnumerable<BookDto>>(books);
                if (booksDtos is null) return Result<IEnumerable<BookDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<BookDto>>.Success(booksDtos);
            }
        }

    }
}
