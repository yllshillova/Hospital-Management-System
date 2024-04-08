using Application.Core;
using Application.Validators;
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
            public UpdateDoctorCommandValidator()
            {
                RuleFor(x => x.Doctor).SetValidator(new DoctorValidator());
            }
        }

        public class UpdateDoctorCommandHandler(IDoctorRepository _doctorRepository,IMapper _mapper) : IRequestHandler<UpdateDoctorCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateDoctorCommand request, CancellationToken cancellationToken)
            {
                var doctor = await _doctorRepository.GetByIdAsync(request.Doctor.Id);
                if (doctor is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");
                
                _mapper.Map(request.Doctor, doctor);
                var result = await _doctorRepository.UpdateAsync(doctor);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the doctor! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
