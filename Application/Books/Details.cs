using Application.Contracts;
using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Books
{
    public class Details
    {
        public record GetBookByIdQuery(Guid Id) : IRequest<Result<BookDto>>;

        public class GetBookByIdQueryHandler(IBookRepository _bookRepository, IMapper _mapper) : IRequestHandler<GetBookByIdQuery, Result<BookDto>>
        {
            public async Task<Result<BookDto>> Handle(GetBookByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var book = await _bookRepository.GetByIdAsync(request.Id);
                    if (book is null) return Result<BookDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var bookDto = _mapper.Map<BookDto>(book);
                    if (bookDto is null) return Result<BookDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<BookDto>.Success(bookDto);
                }
                return Result<BookDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
