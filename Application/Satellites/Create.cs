using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Satellites
{
    public class Create
    {
        public record CreateSatelliteCommand(SatelliteDto Satellite) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateSatelliteCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Satellite).SetValidator(new SatelliteValidator());
            }
        }

        public class CreateSatelliteCommandHandler(ISatelliteRepository _satelliteRepository, IMapper _mapper) : IRequestHandler<CreateSatelliteCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateSatelliteCommand request, CancellationToken cancellationToken)
            {
                if (request.Satellite is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var satellite = _mapper.Map<Satellite>(request.Satellite);
                if (satellite is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                satellite.CreatedAt = DateTime.Now;
                satellite.UpdatedAt = satellite.CreatedAt;

                var result = await _satelliteRepository.CreateAsync(satellite);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the satellite! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
