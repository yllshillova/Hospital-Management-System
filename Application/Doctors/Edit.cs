using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Doctors
{
    public class Edit
    {
        public record UpdateDoctorCommand(DoctorDto Doctor) : IRequest<Result<Unit>>;

        public class UpdateDoctorCommandValidator : AbstractValidator<UpdateDoctorCommand>
        {
            private readonly IUserRepository _userRepository;
            public UpdateDoctorCommandValidator(IUserRepository userRepository)
            {
                _userRepository = userRepository;

                RuleFor(x => x.Doctor).SetValidator(new DoctorValidator(_userRepository));
            }
        }

        public class UpdateDoctorCommandHandler(IDoctorRepository _doctorRepository, IMapper _mapper) : IRequestHandler<UpdateDoctorCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateDoctorCommand request, CancellationToken cancellationToken)
            {
                var doctor = await _doctorRepository.GetByIdAsync(request.Doctor.Id);
                if (doctor is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");
                if (string.IsNullOrWhiteSpace(request.Doctor.Password))
                {
                    // If the password is not provided,  the existing password is maintained
                    request.Doctor.Password = doctor.PasswordHash;
                }

                _mapper.Map(request.Doctor, doctor);
                doctor.CreatedAt = request.Doctor.CreatedAt;
                doctor.UpdatedAt = DateTime.Now;

                var result = await _doctorRepository.UpdateAsync(doctor);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the doctor! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
