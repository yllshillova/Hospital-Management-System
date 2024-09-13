using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Members
{
    public class List
    {
        public record GetMembersQuery : IRequest<Result<IEnumerable<MemberDto>>>;

        public class GetMemberQueryHandler(IMemberRepository _MemberRepository, IMapper _mapper) : IRequestHandler<GetMembersQuery, Result<IEnumerable<MemberDto>>>
        {
            public async Task<Result<IEnumerable<MemberDto>>> Handle(GetMembersQuery request, CancellationToken cancellationToken)
            {
                var Members = await _MemberRepository.GetAllAsync();
                if (Members is null || !Members.Any()) return Result<IEnumerable<MemberDto>>.Failure(ErrorType.NotFound, "No Member records found");

                var MemberDtos = _mapper.Map<IEnumerable<MemberDto>>(Members);
                if (MemberDtos is null) return Result<IEnumerable<MemberDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<MemberDto>>.Success(MemberDtos);
            }
        }

    }
}
