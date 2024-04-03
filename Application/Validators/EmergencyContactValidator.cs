using Application.DTOs;
using FluentValidation;

namespace Application.Validators
{
    public class EmergencyContactValidator : AbstractValidator<EmergencyContactDto>
    {
        public EmergencyContactValidator()
        {
            RuleFor(d => d.ContactName).NotEmpty().Length(3, 250).WithMessage("ContactName field is required.");
            RuleFor(d => d.Relation).NotEmpty().Length(50).WithMessage("Relation field is required.");
            RuleFor(d => d.PhoneNumber).NotEmpty().WithMessage("PhoneNumber field is required.");
            RuleFor(d => d.PatientID).NotEmpty().WithMessage("PatientID field is required.");
        }
    }
}
