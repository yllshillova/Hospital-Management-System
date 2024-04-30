using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Doctors
{
    public class GetPatientsCount
    {
        public record GetDoctorsCountQuery : IRequest<Result<int>>;

        public class GetDoctorsCountQueryHandler(IDoctorRepository _doctorRepository) : IRequestHandler<GetDoctorsCountQuery, Result<int>>
        {
            public async Task<Result<int>> Handle(GetDoctorsCountQuery request, CancellationToken cancellationToken)
            {
                var doctors = await _doctorRepository.GetAllAsync();
                if (doctors is null || !doctors.Any()) return Result<int>.Failure(ErrorType.NotFound, "No doctor found.");

                var doctorsCount = doctors.Count();
                return Result<int>.Success(doctorsCount);

            }
        }
    }
}
