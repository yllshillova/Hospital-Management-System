using Application.Core;
using Application.Employees;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Authors
{
    public class Create
    {
        public record CreateAuthorCommand(AuthorDto Author) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateAuthorCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Author).SetValidator(new AuthorValidator());
            }
        }

        public class CreateAuthorCommandHandler(IAuthorRepository _authorRepository, IMapper _mapper) : IRequestHandler<CreateAuthorCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateAuthorCommand request, CancellationToken cancellationToken)
            {
                if (request.Author is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var author = _mapper.Map<Author>(request.Author);
                if (author is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                author.CreatedAt = DateTime.Now;
                author.UpdatedAt = author.CreatedAt;

                var result = await _authorRepository.CreateAsync(author);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the author! Try again.");

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
