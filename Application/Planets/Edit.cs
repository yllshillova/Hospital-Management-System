using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Planets
{
    public class Edit
    {
        public record UpdatePlanetCommand(PlanetDto Planet) : IRequest<Result<Unit>>;

        public class UpdatePlanetCommandValidator : AbstractValidator<UpdatePlanetCommand>
        {
            public UpdatePlanetCommandValidator()
            {
                RuleFor(x => x.Planet).SetValidator(new PlanetValidator());
            }
        }

        public class UpdatePlanetCommandHandler(IPlanetRepository _planetRepository, IMapper _mapper) : IRequestHandler<UpdatePlanetCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdatePlanetCommand request, CancellationToken cancellationToken)
            {
                var planet = await _planetRepository.GetByIdAsync(request.Planet.Id);
                if (planet is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                _mapper.Map(request.Planet, planet);
                planet.UpdatedAt = DateTime.Now;

                var result = await _planetRepository.UpdateAsync(planet);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the Planet. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
