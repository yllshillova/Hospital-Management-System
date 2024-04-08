using Application.BaseValidators;
using FluentValidation;
using System.Text.RegularExpressions;

namespace Application.Patients
{
    public class PatientValidator : AbstractValidator<PatientDto>
    {
        public PatientValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<PatientDto, string>())
           .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.LastName).SetValidator(new NotNullValidator<PatientDto, string>())
           .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.ParentName).SetValidator(new NotNullValidator<PatientDto, string>())
           .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.PersonalNumber).SetValidator(new NotNullValidator<PatientDto, string>())
           .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.Residence).SetValidator(new NotNullValidator<PatientDto, string>())
           .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.Birthday).NotNull().WithMessage("Birthday field is required.")
           .Must(BeAValidDate).WithMessage("Birthday field is not valid.");
            RuleFor(d => d.BloodGroup).SetValidator(new NotNullValidator<PatientDto, string>())
           .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.Gender).SetValidator(new NotNullValidator<PatientDto, string>())
           .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.Email).SetValidator(new NotNullValidator<PatientDto, string>())
           .Matches(IsValidEmail());
            RuleFor(d => d.PhoneNumber).SetValidator(new NotNullValidator<PatientDto, string>())
           .Must(BeValidPhoneNumber).WithMessage("Invalid phone number. It should contain exactly 9 digits.");
            RuleFor(d => d.Occupation).SetValidator(new NotNullValidator<PatientDto, string>())
           .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.Allergies).SetValidator(new NotNullValidator<PatientDto, string>())
           .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));



        }
        private bool BeAValidDate(DateTime? date)
        {
            return date.HasValue && date.Value.Date <= DateTime.UtcNow.Date;
        }
        private bool BeValidPhoneNumber(string phoneNumber)
        {
            // Check if the phone number contains exactly 9 digits
            return phoneNumber != null && phoneNumber.Length == 9 && phoneNumber.All(char.IsDigit);
        }
        private string IsValidEmail()
        {
            string pattern = @"^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
                return pattern;
        }
    }
}
