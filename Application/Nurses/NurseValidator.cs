using Application.BaseValidators;
using Domain.Contracts;
using FluentValidation;

namespace Application.Nurses
{
    public class NurseValidator : AbstractValidator<NurseDto>
    {
        private readonly IUserRepository _userRepository;
        private readonly INurseRepository _nurseRepository;

        public NurseValidator(IUserRepository userRepository, INurseRepository nurseRepository)
        {
            _userRepository = userRepository;
            _nurseRepository = nurseRepository;
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<NurseDto, string>())
                                .SetValidator(new ValidLengthValidator<NurseDto, string>(4, 100));
            RuleFor(d => d.LastName).SetValidator(new NotNullValidator<NurseDto, string>())
                                    .SetValidator(new ValidLengthValidator<NurseDto, string>(4, 100));
            RuleFor(d => d.Residence).SetValidator(new ValidLengthValidator<NurseDto, string>(4, 100));
            RuleFor(d => d.Address).SetValidator(new ValidLengthValidator<NurseDto, string>(4, 100));
            RuleFor(d => d.Gender).SetValidator(new ValidLengthValidator<NurseDto, string>(4, 100));
            RuleFor(d => d.Birthday).Must(BeAValidDate).WithMessage("Birthday field is not valid.");
            RuleFor(d => d.DepartmentId).SetValidator(new NotNullValidator<NurseDto, Guid>());
            RuleFor(d => d.Password)
            .SetValidator(new NotNullValidator<NurseDto, string>())
            .Matches(IsPasswordComplex());
            RuleFor(d => d.UserName)
                                  .SetValidator(new NotNullValidator<NurseDto, string>())
                                  .SetValidator(new ValidLengthValidator<NurseDto, string>(4, 100))
                                  .Must((nurse,username) =>BeUniqueUsername(nurse.Id,username)).WithMessage("Username is taken. Try another one!");
            RuleFor(d => d.Email)
                .SetValidator(new NotNullValidator<NurseDto, string>())
                .SetValidator(new EmailValidator<NurseDto, string>())
                .Must((nurse,email) => BeUniqueEmail(nurse.Id,email)).WithMessage("Email is taken. Try another one!");
        }

        private bool BeAValidDate(DateTime? date)
        {
            return date.HasValue && date.Value.Date <= DateTime.UtcNow.Date;
        }
        private string IsPasswordComplex()
        {
            string regex = @"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$";
            return regex;
        }
        private bool BeUniqueEmail(Guid NurseId, string email)
        {
            // Check if email is being updated
            var existingNurse = _nurseRepository.GetNurseById(NurseId);
            if (existingNurse != null && existingNurse.Email.Equals(email, StringComparison.OrdinalIgnoreCase))
            {
                // If the email is the same as the existing one, skip uniqueness check
                return true;
            }

            // Otherwise, check for uniqueness
            return !_userRepository.IsEmailTaken(email);
        }

        private bool BeUniqueUsername(Guid NurseId, string username)
        {
            // Check if username is being updated
            var existingNurse = _nurseRepository.GetNurseById(NurseId);
            if (existingNurse != null && existingNurse.UserName.Equals(username, StringComparison.OrdinalIgnoreCase))
            {
                // If the username is the same as the existing one, skip uniqueness check
                return true;
            }

            // Otherwise, check for uniqueness
            return ! _userRepository.IsUsernameTaken(username);
        }
    }
}
