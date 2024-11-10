using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Patients
{
    public class List
    {
        public record GetPatientsQuery : IRequest<Result<IEnumerable<PatientDto>>>;

        public class GetPatientsQueryHandler(IPatientRepository _patientRepository, IMapper _mapper) : IRequestHandler<GetPatientsQuery, Result<IEnumerable<PatientDto>>>
        {
            public async Task<Result<IEnumerable<PatientDto>>> Handle(GetPatientsQuery request, CancellationToken cancellationToken)
            {
                var patients = await _patientRepository.GetAllAsync();
                if (patients is null || !patients.Any()) return Result<IEnumerable<PatientDto>>.Failure(ErrorType.NotFound, "No patient records found in the hospital");

                var patientDtos = _mapper.Map<IEnumerable<PatientDto>>(patients);
                if (patientDtos is null) return Result<IEnumerable<PatientDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<PatientDto>>.Success(patientDtos);
            }
        }

    }
}
