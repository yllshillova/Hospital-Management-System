using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Groups
{
    public class Create
    {
        public record CreateGroupCommand(GroupDto Group) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateGroupCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Group).SetValidator(new GroupValidator());
            }
        }

        public class CreateGroupCommandHandler(IGroupRepository _GroupRepository, IMapper _mapper) : IRequestHandler<CreateGroupCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateGroupCommand request, CancellationToken cancellationToken)
            {
                if (request.Group is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var Group = _mapper.Map<Group>(request.Group);
                if (Group is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                Group.CreatedAt = DateTime.Now;
                Group.UpdatedAt = Group.CreatedAt;

                var result = await _GroupRepository.CreateAsync(Group);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the Group! Try again.");

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
