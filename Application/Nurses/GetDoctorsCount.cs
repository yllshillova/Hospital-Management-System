using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Nurses
{
    public class GetNursesCount
    {
        public record GetNursesCountQuery : IRequest<Result<int>>;

        public class GetNursesCountQueryHandler(INurseRepository _nurseRepository) : IRequestHandler<GetNursesCountQuery, Result<int>>
        {
            public async Task<Result<int>> Handle(GetNursesCountQuery request, CancellationToken cancellationToken)
            {
                var nurses = await _nurseRepository.GetAllAsync();
                if (nurses is null || !nurses.Any()) return Result<int>.Failure(ErrorType.NotFound, "No nurse found.");

                var nurseCount = nurses.Count();
                return Result<int>.Success(nurseCount);

            }
        }
    }
}
