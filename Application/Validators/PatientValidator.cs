using Application.DTOs;
using FluentValidation;

namespace Application.Validators
{
    public class PatientValidator : AbstractValidator<PatientDto>
    {
        public PatientValidator()
        {
            RuleFor(d => d.Id).NotEmpty().WithMessage("Id is required.");
            RuleFor(d => d.Name).NotEmpty().Length(10, 250).WithMessage("Name field is required.");
            RuleFor(d => d.Residence).NotEmpty().Length(50).WithMessage("Residence field is required.");
            RuleFor(d => d.Age).NotEmpty().GreaterThan(5).WithMessage("Age field is required.");
            RuleFor(d => d.Weight).NotEmpty().GreaterThan(30).WithMessage("Weight field is required.");
            RuleFor(d => d.Height).NotEmpty().GreaterThan(140).WithMessage("Height field is required.");
            RuleFor(d => d.Gender).NotEmpty().Length(50).WithMessage("Gender field is required.");
            RuleFor(d => d.BloodGroup).NotEmpty().Length(50).WithMessage("BloodGroup field is required.");

        }
    }
}
