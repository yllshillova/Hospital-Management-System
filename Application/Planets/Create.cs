using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Planets
{
    public class Create
    {
        public record CreatePlanetCommand(PlanetDto Planet) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreatePlanetCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Planet).SetValidator(new PlanetValidator());
            }
        }

        public class CreatePlanetCommandHandler(IPlanetRepository _planetRepository, IMapper _mapper) : IRequestHandler<CreatePlanetCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreatePlanetCommand request, CancellationToken cancellationToken)
            {
                if (request.Planet is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var planet = _mapper.Map<Planet>(request.Planet);
                if (planet is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                planet.CreatedAt = DateTime.Now;
                planet.UpdatedAt = planet.CreatedAt;

                var result = await _planetRepository.CreateAsync(planet);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the planet! Try again.");

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
