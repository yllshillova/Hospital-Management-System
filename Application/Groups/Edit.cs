using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Groups
{
    public class Edit
    {
        public record UpdateGroupCommand(GroupDto Group) : IRequest<Result<Unit>>;

        public class UpdateGroupCommandValidator : AbstractValidator<UpdateGroupCommand>
        {
            public UpdateGroupCommandValidator()
            {
                RuleFor(x => x.Group).SetValidator(new GroupValidator());
            }
        }

        public class UpdateGroupCommandHandler(IGroupRepository _GroupRepository, IMapper _mapper) : IRequestHandler<UpdateGroupCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateGroupCommand request, CancellationToken cancellationToken)
            {
                var Group = await _GroupRepository.GetByIdAsync(request.Group.Id);
                if (Group is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                _mapper.Map(request.Group, Group);
                Group.UpdatedAt = DateTime.Now;

                var result = await _GroupRepository.UpdateAsync(Group);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the Group. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
