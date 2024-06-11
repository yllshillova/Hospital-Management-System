using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.EmergencyContacts
{
    public class GetByPatientId
    {
        public record GetEmergencyContactsByPatientIdQuery(Guid PatientId) : IRequest<Result<IEnumerable<EmergencyContactDto>>>;

        public class GetEmergencyContactsByPatientIdQueryHandler : IRequestHandler<GetEmergencyContactsByPatientIdQuery, Result<IEnumerable<EmergencyContactDto>>>
        {
            private readonly IEmergencyContactRepository _emergencyContactRepository;
            private readonly IMapper _mapper;

            public GetEmergencyContactsByPatientIdQueryHandler(IEmergencyContactRepository emergencyContactRepository, IMapper mapper)
            {
                _emergencyContactRepository = emergencyContactRepository;
                _mapper = mapper;
            }

            public async Task<Result<IEnumerable<EmergencyContactDto>>> Handle(GetEmergencyContactsByPatientIdQuery request, CancellationToken cancellationToken)
            {
                if (request.PatientId == Guid.Empty)
                {
                    return Result<IEnumerable<EmergencyContactDto>>.Failure(ErrorType.BadRequest, "Invalid patient ID");
                }

                var emergencyContacts = await _emergencyContactRepository.GetByPatientIdAsync(request.PatientId);
                if (emergencyContacts == null || !emergencyContacts.Any())
                {
                    return Result<IEnumerable<EmergencyContactDto>>.Failure(ErrorType.NotFound, "No emergency contact records found for any patient");
                }

                var emergencyContactDtos = _mapper.Map<IEnumerable<EmergencyContactDto>>(emergencyContacts);
                if (emergencyContactDtos == null || !emergencyContactDtos.Any())
                {
                    return Result<IEnumerable<EmergencyContactDto>>.Failure(ErrorType.BadRequest, "Error mapping emergency contacts to DTOs");
                }

                return Result<IEnumerable<EmergencyContactDto>>.Success(emergencyContactDtos);
            }
        }
    }
}
