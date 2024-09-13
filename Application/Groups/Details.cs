using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Groups
{
    public class Details
    {
        public record GetGroupByIdQuery(Guid Id) : IRequest<Result<GroupDto>>;

        public class GetGroupByIdQueryHandler(IGroupRepository _GroupRepository, IMapper _mapper) : IRequestHandler<GetGroupByIdQuery, Result<GroupDto>>
        {
            public async Task<Result<GroupDto>> Handle(GetGroupByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var Group = await _GroupRepository.GetByIdAsync(request.Id);
                    if (Group is null) return Result<GroupDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var GroupDto = _mapper.Map<GroupDto>(Group);
                    if (GroupDto is null) return Result<GroupDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<GroupDto>.Success(GroupDto);
                }
                return Result<GroupDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
