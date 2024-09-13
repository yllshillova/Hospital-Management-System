using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Members
{
    public class Delete
    {
        public record DeleteMemberCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteMemberCommandHandler(IMemberRepository _MemberRepository) : IRequestHandler<DeleteMemberCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteMemberCommand request, CancellationToken cancellationToken)
            {
                var Member = await _MemberRepository.GetByIdAsync(request.Id);
                if (Member is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var result = await _MemberRepository.DeleteAsync(Member);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the Member. Try again!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
