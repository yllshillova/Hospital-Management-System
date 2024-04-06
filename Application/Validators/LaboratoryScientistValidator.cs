using Application.DTOs;
using FluentValidation;

namespace Application.Validators
{
    public class LaboratoryScientistValidator : AbstractValidator<LaboratoryScientistDto>
    {
        public LaboratoryScientistValidator()
        {
            /*RuleFor(d => d.Gender).NotEmpty().WithMessage("Gender field is required.");
            RuleFor(d => d.DateOfBirth).NotEmpty().WithMessage("Date of birth is required.")
            .Must(BeAValidDate).WithMessage("Invalid date of birth format.");
            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("The phone number of the employer is required.")
                .Must(BeValidPhoneNumber).WithMessage("Invalid phone number. It should contain exactly 9 digits.");
            RuleFor(d => d.Address).NotEmpty().WithMessage("The address of the employer is required!")
               .MinimumLength(10).WithMessage("The name of the employer should be at minimum 10 characters!");
            RuleFor(x => x.Email).NotEmpty().WithMessage("The email of the employer is required!").EmailAddress()
                .WithMessage("Invalid email address format.The email should contain \"@\" ").Must(ContainNumberAndDomain)
                    .WithMessage("The email should contain a digit and end either with \".com\" or \".net\"");*/
            RuleFor(d => d.StaffId).NotEmpty().WithMessage("StaffId field is required.");
        }
        private bool BeAValidDate(DateTime date)
        { 
            return date <= DateTime.Now; // should not be in the future
        }
        private bool BeValidPhoneNumber(string phoneNumber)
        {
            return phoneNumber != null && phoneNumber.Length == 9 && phoneNumber.All(char.IsDigit);
        }
        private bool ContainNumberAndDomain(string email)
        {
            if (!email.Any(char.IsDigit))
                return false;
            if (!email.EndsWith(".com") || !email.EndsWith(".net"))
                return false;

            return true;
        }
    }
}