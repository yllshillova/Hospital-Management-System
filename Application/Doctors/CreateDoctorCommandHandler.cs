using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using MediatR;

namespace Application.Doctors
{
    public class CreateDoctorCommandHandler(IDoctorRepository _doctorRepository, IMapper _mapper) : IRequestHandler<CreateDoctorCommand, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(CreateDoctorCommand request, CancellationToken cancellationToken)
        {
            var doctor = _mapper.Map<Doctor>(request.Doctor);
            if (doctor is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

            await _doctorRepository.CreateAsync(doctor);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
