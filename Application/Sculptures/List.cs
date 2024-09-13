using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using MediatR;

namespace Application.Sculptures
{
    public class List
    {
        public record GetSculpturesQuery(string? Name) : IRequest<Result<IEnumerable<SculptureDto>>>;

        public class GetSculptureQueryHandler(ISculptureRepository _SculptureRepository, IMapper _mapper) : IRequestHandler<GetSculpturesQuery, Result<IEnumerable<SculptureDto>>>
        {
            public async Task<Result<IEnumerable<SculptureDto>>> Handle(GetSculpturesQuery request, CancellationToken cancellationToken)
            {
                IEnumerable<Sculpture> sculptures;

                if (!string.IsNullOrEmpty(request.Name))
                {
                    sculptures = await _SculptureRepository.GetBySculptorAsync(request.Name);
                    if (sculptures == null || !sculptures.Any())
                    {
                        return Result<IEnumerable<SculptureDto>>.Failure(ErrorType.NotFound, $"No Sculpture records found for sculptor '{request.Name}'.");
                    }
                }

                else
                {
                    sculptures = await _SculptureRepository.GetAllAsync();
                }

                if (sculptures == null || !sculptures.Any()) return Result<IEnumerable<SculptureDto>>.Failure(ErrorType.NotFound, "No Sculpture records found");

                var SculptureDtos = _mapper.Map<IEnumerable<SculptureDto>>(sculptures);
                if (SculptureDtos == null) return Result<IEnumerable<SculptureDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<SculptureDto>>.Success(SculptureDtos);
            }
        }

    }
}
