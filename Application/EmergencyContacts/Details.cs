using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.EmergencyContacts
{
    public class Details
    {
        public record GetEmergencyContactByIdQuery(Guid Id) : IRequest<Result<EmergencyContactDto>>;

        public class GetEmergencyContactByIdQueryHandler(IEmergencyContactRepository _emergencyContactRepository, IMapper _mapper) : IRequestHandler<GetEmergencyContactByIdQuery, Result<EmergencyContactDto>>
        {
            public async Task<Result<EmergencyContactDto>> Handle(GetEmergencyContactByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var emergencyContact = await _emergencyContactRepository.GetByIdAsync(request.Id);
                    if (emergencyContact is null) return Result<EmergencyContactDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var emergencyContactDto = _mapper.Map<EmergencyContactDto>(emergencyContact);
                    if (emergencyContactDto is null) return Result<EmergencyContactDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<EmergencyContactDto>.Success(emergencyContactDto);
                }
                return Result<EmergencyContactDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
