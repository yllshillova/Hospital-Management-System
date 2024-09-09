using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Authors
{
    public class List
    {
        public record GetAuthorsQuery : IRequest<Result<IEnumerable<AuthorDto>>>;

        public class GetAuthorsQueryHandler(IAuthorRepository _authorRepository, IMapper _mapper) : IRequestHandler<GetAuthorsQuery, Result<IEnumerable<AuthorDto>>>
        {
            public async Task<Result<IEnumerable<AuthorDto>>> Handle(GetAuthorsQuery request, CancellationToken cancellationToken)
            {
                var authors = await _authorRepository.GetAllAsync();
                if (authors is null || !authors.Any()) return Result<IEnumerable<AuthorDto>>.Failure(ErrorType.NotFound, "No author records found");

                var authorDtos = _mapper.Map<IEnumerable<AuthorDto>>(authors);
                if (authorDtos is null) return Result<IEnumerable<AuthorDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<AuthorDto>>.Success(authorDtos);
            }
        }

    }
}
