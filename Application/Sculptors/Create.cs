using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Sculptors
{
    public class Create
    {
        public record CreateSculptorCommand(SculptorDto Sculptor) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateSculptorCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Sculptor).SetValidator(new SculptorValidator());
            }
        }

        public class CreateSculptorCommandHandler(ISculptorRepository _SculptorRepository, IMapper _mapper) : IRequestHandler<CreateSculptorCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateSculptorCommand request, CancellationToken cancellationToken)
            {
                if (request.Sculptor is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var Sculptor = _mapper.Map<Sculptor>(request.Sculptor);
                if (Sculptor is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                Sculptor.CreatedAt = DateTime.Now;
                Sculptor.UpdatedAt = Sculptor.CreatedAt;

                var result = await _SculptorRepository.CreateAsync(Sculptor);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the Sculptor! Try again.");

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
