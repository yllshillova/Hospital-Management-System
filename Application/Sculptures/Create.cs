using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Sculptures
{
    public class Create
    {
        public record CreateSculptureCommand(SculptureDto Sculpture) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateSculptureCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Sculpture).SetValidator(new SculptureValidator());
            }
        }

        public class CreateSculptureCommandHandler(ISculptureRepository _SculptureRepository, IMapper _mapper) : IRequestHandler<CreateSculptureCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateSculptureCommand request, CancellationToken cancellationToken)
            {
                if (request.Sculpture is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var Sculpture = _mapper.Map<Sculpture>(request.Sculpture);
                if (Sculpture is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                Sculpture.CreatedAt = DateTime.Now;
                Sculpture.UpdatedAt = Sculpture.CreatedAt;

                var result = await _SculptureRepository.CreateAsync(Sculpture);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the Sculpture! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
