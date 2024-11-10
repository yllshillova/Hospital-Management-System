using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Patients
{
    public class GetPatientsCount
    {
        public record GetPatientsCountQuery : IRequest<Result<int>>;

        public class GetPatientsCountQueryHandler(IPatientRepository _doctorRepository) : IRequestHandler<GetPatientsCountQuery, Result<int>>
        {
            public async Task<Result<int>> Handle(GetPatientsCountQuery request, CancellationToken cancellationToken)
            {
                var patients = await _doctorRepository.GetAllAsync();
                if (patients is null || !patients.Any()) return Result<int>.Failure(ErrorType.NotFound, "No patient found.");

                var activePatientsCount = patients.Count(patient => !patient.IsDeleted);
                return Result<int>.Success(activePatientsCount);

            }
        }
    }
}
