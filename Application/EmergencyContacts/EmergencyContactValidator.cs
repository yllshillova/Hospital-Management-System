using Application.BaseValidators;
using FluentValidation;

namespace Application.EmergencyContacts
{
    public class EmergencyContactValidator : AbstractValidator<EmergencyContactDto>
    {
        public EmergencyContactValidator()
        {
            RuleFor(d => d.ContactName).SetValidator(new NotNullValidator<EmergencyContactDto, string>())
                                         .SetValidator(new ValidLengthValidator<EmergencyContactDto, string>(2, 100));
            RuleFor(d => d.Relation).SetValidator(new NotNullValidator<EmergencyContactDto, string>())
                                         .SetValidator(new ValidLengthValidator<EmergencyContactDto, string>(4, 100));
            RuleFor(d => d.PhoneNumber).SetValidator(new NotNullValidator<EmergencyContactDto, string>())
                                         .Must(BeValidNumber).WithMessage("Invalid phone number. It should contain exactly 9 digits.");
            RuleFor(d => d.PatientId).SetValidator(new NotNullValidator<EmergencyContactDto, Guid>());
        }

        private bool BeValidNumber(string number)
        {
            return number != null && number.Length == 9 && number.All(char.IsDigit);
        }
    }
}
