using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Buildings
{
    public class Create
    {
        public record CreateBuildingCommand(BuildingDto Building) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateBuildingCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Building).SetValidator(new BuildingValidator());
            }
        }

        public class CreateBuildingCommandHandler(IBuildingRepository _BuildingRepository, IMapper _mapper) : IRequestHandler<CreateBuildingCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateBuildingCommand request, CancellationToken cancellationToken)
            {
                if (request.Building is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var Building = _mapper.Map<Building>(request.Building);
                if (Building is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                Building.CreatedAt = DateTime.Now;
                Building.UpdatedAt = Building.CreatedAt;

                var result = await _BuildingRepository.CreateAsync(Building);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the Building! Try again.");

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
