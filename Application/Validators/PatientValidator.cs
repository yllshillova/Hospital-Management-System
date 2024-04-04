using Application.DTOs;
using FluentValidation;

namespace Application.Validators
{
    public class PatientValidator : AbstractValidator<PatientDto>
    {
        public PatientValidator()
        {
            RuleFor(d => d.Name).NotEmpty().Length(3, 8).WithMessage("Name field is required.");
            RuleFor(d => d.Residence).NotEmpty().Length(10).WithMessage("Residence field is required.");
            RuleFor(d => d.Age).NotEmpty().GreaterThan(0).WithMessage("Age field is required.");
            /*RuleFor(d => d.Weight).NotEmpty().GreaterThan(40).WithMessage("Weight field is required.")
                 .InclusiveBetween(0, 120).WithMessage("Weight must be between 0 and 120.");
            RuleFor(d => d.Height).NotEmpty().GreaterThan(140).WithMessage("Height field is required.")
                 .GreaterThanOrEqualTo(40).WithMessage("Height must be at least 40.");*/
            RuleFor(d => d.Gender).NotEmpty().Length(6).WithMessage("Gender field is required.");
            RuleFor(d => d.BloodGroup).NotEmpty().Length(4).WithMessage("BloodGroup field is required.");

        }
    }
}
