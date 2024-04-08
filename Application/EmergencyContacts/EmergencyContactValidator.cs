using Application.BaseValidators;
using FluentValidation;

namespace Application.EmergencyContacts
{
    public class EmergencyContactValidator : AbstractValidator<EmergencyContactDto>
    {
        public EmergencyContactValidator()
        {
            RuleFor(d => d.ContactName).SetValidator(new NotNullValidator<EmergencyContactDto, string>())
                                         .SetValidator(new ValidLengthValidator<EmergencyContactDto, string>(4, 100));
            RuleFor(d => d.Relation).SetValidator(new NotNullValidator<EmergencyContactDto, string>())
                                         .SetValidator(new ValidLengthValidator<EmergencyContactDto, string>(4, 100));
            RuleFor(d => d.PhoneNumber).SetValidator(new NotNullValidator<EmergencyContactDto, string>())
                                         .SetValidator(new ValidLengthValidator<EmergencyContactDto, string>(4, 100));
            RuleFor(d => d.PatientId).SetValidator(new NotNullValidator<EmergencyContactDto, Guid>());
        }
    }
}
