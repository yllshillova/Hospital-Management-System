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
            public CommandValidator()
            {
                RuleFor(x => x.Doctor).SetValidator(new DoctorValidator());
            }
        }

        public class CreateDoctorCommandHandler(IDoctorRepository _doctorRepository, IMapper _mapper) : IRequestHandler<CreateDoctorCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateDoctorCommand request, CancellationToken cancellationToken)
            {
                if (request.Doctor is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again.");

                var doctor = _mapper.Map<Doctor>(request.Doctor);
                if (doctor is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                doctor.CreatedAt = DateTime.Now;
                doctor.UpdatedAt = doctor.CreatedAt;

                var result = await _doctorRepository.CreateAsync(doctor);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the doctor! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
