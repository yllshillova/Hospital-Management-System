using Application.BaseValidators;
using FluentValidation;

namespace Application.Patients
{
    public class PatientValidator : AbstractValidator<PatientDto>
    {
        public PatientValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<PatientDto, string>())
                                 .SetValidator(new ValidLengthValidator<PatientDto, string>(2, 100));
            RuleFor(d => d.LastName).SetValidator(new NotNullValidator<PatientDto, string>())
                                    .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.ParentName).SetValidator(new NotNullValidator<PatientDto, string>())
                                      .SetValidator(new ValidLengthValidator<PatientDto, string>(2, 100));
            RuleFor(d => d.PersonalNumber).SetValidator(new NotNullValidator<PatientDto, string>())
                                          .Must(personalNumber => BeValidNumber(personalNumber, 10))
                                          .WithMessage("Invalid personal number. It should contain exactly 10 digits.");
            RuleFor(d => d.Address).SetValidator(new NotNullValidator<PatientDto, string>())
                                     .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.Residence).SetValidator(new NotNullValidator<PatientDto, string>())
                                     .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.Birthday).Must(BeAValidDate).WithMessage("Birthday field is not valid.");
            RuleFor(d => d.BloodGroup).SetValidator(new NotNullValidator<PatientDto, string>())
                                      .Must(BeValidBloodGroup).WithMessage("Invalid blood group."); ;
            RuleFor(d => d.Gender).SetValidator(new NotNullValidator<PatientDto, string>())
                                  .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.Email).SetValidator(new NotNullValidator<PatientDto, string>())
                                 .Matches(IsValidEmail());
            RuleFor(d => d.PhoneNumber).SetValidator(new NotNullValidator<PatientDto, string>())
                                       .Must(phoneNumber => BeValidNumber(phoneNumber, 9))
                                       .WithMessage("Invalid phone number. It should contain exactly 9 digits.");
            RuleFor(d => d.Occupation).SetValidator(new NotNullValidator<PatientDto, string>())
                                      .SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));
            RuleFor(d => d.Allergies).SetValidator(new ValidLengthValidator<PatientDto, string>(4, 100));



        }
        private bool BeAValidDate(DateTime? date)
        {
            return date.HasValue && date.Value.Date <= DateTime.UtcNow.Date;
        }
        private bool BeValidNumber(string number, int expectedLength)
        {
            return number != null && number.Length == expectedLength && number.All(char.IsDigit);
        }
        private string IsValidEmail()
        {
            string pattern = @"^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            return pattern;
        }
        private bool BeValidBloodGroup(string bloodGroup)
        {
            string[] validBloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
            return !string.IsNullOrEmpty(bloodGroup) && validBloodGroups.Contains(bloodGroup.ToUpper());
        }
    }
}
