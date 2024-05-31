using Application.BaseValidators;
using Domain.Contracts;
using FluentValidation;

namespace Application.Nurses
{
    public class NurseValidator : AbstractValidator<NurseDto>
    {
        private readonly IUserRepository _userRepository;
        public NurseValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;

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
                                .Must(BeUniqueUsername).WithMessage("Username is taken. Try another one!");
            RuleFor(d => d.Email)
                .SetValidator(new NotNullValidator<NurseDto, string>())
                .SetValidator(new EmailValidator<NurseDto, string>())
                .Must(BeUniqueEmail).WithMessage("Email is taken. Try another one!");
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
        private bool BeUniqueEmail(string email)
        {
            // Use the synchronous method from the user repository
            return !_userRepository.IsEmailTaken(email);
        }
        private bool BeUniqueUsername(string username)
        {
            // Use the synchronous method from the user repository
            return !_userRepository.IsUsernameTaken(username);
        }
    }
}
