using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Patients
{
    public class Details
    {
        public record GetPatientByIdQuery(Guid Id) : IRequest<Result<PatientDto>>;

        public class GetPatientByIdQueryHandler(IPatientRepository _patientRepository, IMapper _mapper) : IRequestHandler<GetPatientByIdQuery, Result<PatientDto>>
        {
            public async Task<Result<PatientDto>> Handle(GetPatientByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var patient = await _patientRepository.GetByIdAsync(request.Id);
                    if (patient is null) return Result<PatientDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var patientDto = _mapper.Map<PatientDto>(patient);
                    if (patientDto is null) return Result<PatientDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<PatientDto>.Success(patientDto);
                }
                return Result<PatientDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
