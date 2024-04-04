using Application.Staff;
using FluentValidation;

namespace Application.Validators
{
    public class StaffValidator : AbstractValidator<StaffDto>
    {
        public StaffValidator()
        {
            RuleFor(d => d.Id).NotEmpty().WithMessage("The Id of the employer is required!");
            RuleFor(d => d.Name).NotEmpty().WithMessage("The name of the employer is required!")
                .MinimumLength(2).WithMessage("The name of the employer should be at minimum 2 characters!");
            RuleFor(d => d.LastName).NotEmpty().WithMessage("The name of the employer is required!")
                .MinimumLength(2).WithMessage("The name of the employer should be at minimum 2 characters!");
            RuleFor(d => d.Type).NotEmpty().WithMessage("The type of the employer is required!")
                .MinimumLength(5).WithMessage("The name of the employer should be at minimum 5 characters!");
            RuleFor(d => d.DateJoined).NotEmpty().WithMessage("The date which the employer has been joined is required!")
                .Must(BeInThePast).WithMessage("Join date cannot be in the future!");
            RuleFor(d => d.Residence).NotEmpty().WithMessage("The residence of the employer is required!")
                .MinimumLength(2).WithMessage("The residence of the employer should be at minimum 2 characters!");
            RuleFor(x => x.Email).NotEmpty().WithMessage("The email of the employer is required!").EmailAddress()
                .WithMessage("Invalid email address format.The email should contain \"@\" ").Must(ContainNumberAndDomain)
                    .WithMessage("The email should contain a digit and end either with \".com\" or \".net\"");
            RuleFor(d => d.Address).NotEmpty().WithMessage("The address of the employer is required!")
                .MinimumLength(10).WithMessage("The name of the employer should be at minimum 10 characters!");
            RuleFor(d => d.Gender).NotEmpty().WithMessage("The gender of the employer is required!")
                .MinimumLength(4).WithMessage("The gender of the employer should be at minimum 4 characters!");
            RuleFor(d => d.DateOfBirth).NotEmpty().WithMessage("The date of birth of the employer required!")
                .Must(BeValidDateOfBirth).WithMessage("The date of birth cannot be in the future!");
            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("The phone number of the employer is required.")
                .Must(BeValidPhoneNumber).WithMessage("Invalid phone number. It should contain exactly 9 digits.");
            RuleFor(d => d.DepartmentId).NotEmpty().WithMessage("DepartmentId field is required.");

        }

        private bool BeInThePast(DateTime dateJoined)
        {
            return dateJoined <= DateTime.Now;
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

        private bool BeValidDateOfBirth(DateTime dateOfBirth)
        {
            return dateOfBirth > DateTime.Now;

        }

        private bool BeValidPhoneNumber(string phoneNumber)
        {
            // Check if the phone number contains exactly 9 digits
            return phoneNumber != null && phoneNumber.Length == 9 && phoneNumber.All(char.IsDigit);
        }

    }
}
