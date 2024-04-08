using FluentValidation;
using System.Text.RegularExpressions;

namespace Application.Patients
{
    public class PatientValidator : AbstractValidator<PatientDto>
    {
        public PatientValidator()
        {
            RuleFor(d => d.Name).NotEmpty().WithMessage("Name field is required.").Must(HaveValidLength).WithMessage(d => UsernameLengthErrorMessage(d.Name));
            RuleFor(d => d.LastName).NotEmpty().Must(HaveValidLength).WithMessage(d => UsernameLengthErrorMessage(d.LastName));
            RuleFor(d => d.ParentName).NotEmpty().Must(HaveValidLength).WithMessage(d => UsernameLengthErrorMessage(d.ParentName));         
            RuleFor(d => d.PersonalNumber).NotEmpty().WithMessage("PersonalNumber field is required.").Length(10,20).WithMessage("PersonalNumber field must contain at least 10 digits.");
            RuleFor(d => d.Address).NotEmpty().Must(HaveValidLength).WithMessage(d => UsernameLengthErrorMessage(d.Address));
            RuleFor(d => d.Residence).NotEmpty().Must(HaveValidLength).WithMessage(d => UsernameLengthErrorMessage(d.Residence));
            RuleFor(d => d.Birthday).NotNull().WithMessage("Birthday field is required.").Must(BeAValidDate).WithMessage("Birthday field is not valid.");
            RuleFor(d => d.BloodGroup).NotEmpty().Length(1, 20).WithMessage("BloodGroup field is required.");
            RuleFor(d => d.Gender).NotEmpty().WithMessage("Gender field is required.").Must(HaveValidLength).WithMessage(d => UsernameLengthErrorMessage(d.Gender));
            RuleFor(x => x.Email).NotEmpty().WithMessage("The email of the employer is required!").EmailAddress()
            .WithMessage("Invalid email address format.The email should contain \"@\" ").Must(ContainNumberAndDomain)
            .WithMessage("The email should contain a digit and end either with \".com\" or \".net\"");
            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("The phone number of the employer is required.")
            .Must(BeValidPhoneNumber).WithMessage("Invalid phone number. It should contain exactly 9 digits.");
            RuleFor(d => d.Occupation).NotEmpty().WithMessage("Occupation field is required.").Length(10, 300).WithMessage("Occupation field must be longer.");
            RuleFor(d => d.Allergies).NotEmpty().WithMessage("Allergies field is required.").Length(10, 300).WithMessage("Allergies field must be longer.");

        }
        private bool BeAValidDate(DateTime? date)
        {
            return date.HasValue && date.Value.Date <= DateTime.UtcNow.Date;
        }
        private bool ContainNumberAndDomain(string email)
        {
            //Ensuring that the email contains a digit
            if (!email.Any(char.IsDigit))
                return false;
            //Ensuring that the email contains the ".com"  or ".net"
            if (!email.EndsWith(".com") || !email.EndsWith(".net"))
                return false;

            return true;
        }
        private bool BeValidPhoneNumber(string phoneNumber)
        {
            // Check if the phone number contains exactly 9 digits
            return phoneNumber != null && phoneNumber.Length == 9 && phoneNumber.All(char.IsDigit);
        }
        
        private bool HaveValidLength(string value)
        {
            return value?.Length >= 3 && value?.Length <= 30;
        }

        private string UsernameLengthErrorMessage(string value)
        {
            return $"Username length must be between 3 and 30 characters.";
        }

    }
}
