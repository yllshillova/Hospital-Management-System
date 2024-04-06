using Application.Doctors;
using FluentValidation;

namespace Application.Validators
{
    public class DoctorValidator : AbstractValidator<DoctorDto>
    {
        public DoctorValidator()
        {
            RuleFor(d => d.Qualifications).NotEmpty().Length(10, 250).WithMessage("Qualifications field is required.");
            RuleFor(d => d.Specialization).NotEmpty().Length(10,250).WithMessage("Specialization field is required.");
            RuleFor(d => d.StaffId).NotEmpty().WithMessage("StaffId field is required.");
        }
    }
}
