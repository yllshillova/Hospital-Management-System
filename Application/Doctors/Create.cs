using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Doctors
{
    public class Create
    {
        public record CreateDoctorCommand(DoctorDto Doctor) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateDoctorCommand>
        {
            private readonly IUserRepository _userRepository;
            public CommandValidator(IUserRepository userRepository)
            {
                _userRepository = userRepository;
                RuleFor(x => x.Doctor)
                    .SetValidator(new DoctorValidator(_userRepository));
            }
        }

        public class CreateDoctorCommandHandler(ITokenRepository _tokenRepository, IUserRepository _userRepository, IMapper _mapper) : IRequestHandler<CreateDoctorCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateDoctorCommand request, CancellationToken cancellationToken)
            {
                if (request.Doctor is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var doctor = _mapper.Map<Doctor>(request.Doctor);
                doctor.CreatedAt = DateTime.Now;
                doctor.UpdatedAt = DateTime.Now;

                var doctorCreation = await _userRepository.CreateUserWithRoleAsync(doctor, request.Doctor.Password, "Doctor");
                if (!doctorCreation)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the doctor.");

                var (accessToken, refreshToken) = await _tokenRepository.CreateTokens(doctor);

                var doctorDto = _mapper.Map<DoctorDto>(doctor);
                doctorDto.AccessToken = accessToken;
                doctorDto.RefreshToken = refreshToken;

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
