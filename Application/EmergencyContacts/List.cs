using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.EmergencyContacts
{
    public class List
    {
        public record GetEmergencyContactsQuery : IRequest<Result<IEnumerable<EmergencyContactDto>>>;

        public class GetEmergencyContactsQueryHandler(IEmergencyContactRepository _emergencyContactRepository, IMapper _mapper) : IRequestHandler<GetEmergencyContactsQuery, Result<IEnumerable<EmergencyContactDto>>>
        {
            public async Task<Result<IEnumerable<EmergencyContactDto>>> Handle(GetEmergencyContactsQuery request, CancellationToken cancellationToken)
            {
                var emergencyContacts = await _emergencyContactRepository.GetAllAsync();
                if (emergencyContacts is null || !emergencyContacts.Any()) return Result<IEnumerable<EmergencyContactDto>>.Failure(ErrorType.NotFound, "No records could be found!");

                var emergencyContactDtos = _mapper.Map<IEnumerable<EmergencyContactDto>>(emergencyContacts);
                if (emergencyContactDtos is null) return Result<IEnumerable<EmergencyContactDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<EmergencyContactDto>>.Success(emergencyContactDtos);
            }
        }

    }
}
