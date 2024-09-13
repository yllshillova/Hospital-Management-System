using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Groups
{
    public class List
    {
        public record GetGroupsQuery : IRequest<Result<IEnumerable<GroupDto>>>;

        public class GetGroupQueryHandler(IGroupRepository _GroupRepository, IMapper _mapper) : IRequestHandler<GetGroupsQuery, Result<IEnumerable<GroupDto>>>
        {
            public async Task<Result<IEnumerable<GroupDto>>> Handle(GetGroupsQuery request, CancellationToken cancellationToken)
            {
                var Groups = await _GroupRepository.GetAllAsync();
                if (Groups is null || !Groups.Any()) return Result<IEnumerable<GroupDto>>.Failure(ErrorType.NotFound, "No Group records found");

                var GroupDtos = _mapper.Map<IEnumerable<GroupDto>>(Groups);
                if (GroupDtos is null) return Result<IEnumerable<GroupDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<GroupDto>>.Success(GroupDtos);
            }
        }

    }
}
