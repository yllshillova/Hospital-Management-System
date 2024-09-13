using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Members
{
    public class Create
    {
        public record CreateMemberCommand(MemberDto Member) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateMemberCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Member).SetValidator(new MemberValidator());
            }
        }

        public class CreateMemberCommandHandler(IMemberRepository _MemberRepository, IMapper _mapper) : IRequestHandler<CreateMemberCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateMemberCommand request, CancellationToken cancellationToken)
            {
                if (request.Member is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var Member = _mapper.Map<Member>(request.Member);
                if (Member is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                Member.CreatedAt = DateTime.Now;
                Member.UpdatedAt = Member.CreatedAt;

                var result = await _MemberRepository.CreateAsync(Member);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the Member! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
