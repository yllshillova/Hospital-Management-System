using Application.Core;
using Domain.Contracts;
using Domain.Entities;
using MediatR;
namespace Application.Patients
{
    public class GetLatestPatients
    {
        public record GetLatestPatientsQuery : IRequest<Result<IEnumerable<Patient>>>;

        public class GetLatestPatientsQueryHandler(IPatientRepository _patientRepository) :
                IRequestHandler<GetLatestPatientsQuery, Result<IEnumerable<Patient>>>
        {
            public async Task<Result<IEnumerable<Patient>>> Handle(GetLatestPatientsQuery request, CancellationToken cancellationToken)
            {
                var users = await _patientRepository.GetLatestPatientsAsync(3);
                if (users == null || !users.Any())
                    return Result<IEnumerable<Patient>>.Failure(ErrorType.NotFound, "No patient found.");

                return Result<IEnumerable<Patient>>.Success(users);
            }
        }
    }
}
