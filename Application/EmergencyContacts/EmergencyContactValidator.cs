using FluentValidation;

namespace Application.EmergencyContacts
{
    public class EmergencyContactValidator : AbstractValidator<EmergencyContactDto>
    {
        public EmergencyContactValidator()
        {
            RuleFor(d => d.ContactName).NotEmpty().Length(3, 30).WithMessage("ContactName field is required.");
            RuleFor(d => d.Relation).NotEmpty().Length(3, 50).WithMessage("Relation field is required.");
            RuleFor(d => d.PhoneNumber).NotEmpty().Matches(@"^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$").MaximumLength(15).WithMessage("PhoneNumber field is required.");
            RuleFor(d => d.PatientId).NotEmpty().WithMessage("PatientID field is required.");
        }
    }
}
