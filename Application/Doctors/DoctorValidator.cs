using Application.BaseValidators;
using Domain.Contracts;
using FluentValidation;

namespace Application.Doctors
{
    public class DoctorValidator : AbstractValidator<DoctorDto>
    {
        private readonly IUserRepository _userRepository;

        public DoctorValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;

            RuleFor(d => d.Name).SetValidator(new NotNullValidator<DoctorDto, string>())
                                .SetValidator(new ValidLengthValidator<DoctorDto, string>(4, 100));
            RuleFor(d => d.LastName).SetValidator(new NotNullValidator<DoctorDto, string>())
                                    .SetValidator(new ValidLengthValidator<DoctorDto, string>(4, 100));
            RuleFor(d => d.Residence).SetValidator(new ValidLengthValidator<DoctorDto, string>(4, 100))
                                     .SetValidator(new NotNullValidator<DoctorDto, string>());
            RuleFor(d => d.Address).SetValidator(new ValidLengthValidator<DoctorDto, string>(4, 100))
                                   .SetValidator(new NotNullValidator<DoctorDto, string>());
            RuleFor(d => d.Gender).SetValidator(new ValidLengthValidator<DoctorDto, string>(4, 100))
                                  .SetValidator(new NotNullValidator<DoctorDto, string>());
            RuleFor(d => d.Birthday).Must(BeAValidDate).WithMessage("Birthday field is not valid.");
            RuleFor(d => d.Specialization).SetValidator(new NotNullValidator<DoctorDto, string>())
                                          .SetValidator(new ValidLengthValidator<DoctorDto, string>(4, 100));
            RuleFor(d => d.DepartmentId).SetValidator(new NotNullValidator<DoctorDto, Guid>());
            RuleFor(d => d.UserName)
                                  .SetValidator(new NotNullValidator<DoctorDto, string>())
                                  .SetValidator(new ValidLengthValidator<DoctorDto, string>(4, 100))
                                  .Must(BeUniqueUsername).WithMessage("Username is taken. Try another one!");
            RuleFor(d => d.Email).SetValidator(new NotNullValidator<DoctorDto, string>())
                                 .SetValidator(new EmailValidator<DoctorDto, string>())
                                 .Must(BeUniqueEmail).WithMessage("Email is taken. Try another one!");
            RuleFor(d => d.Password)
            .NotNull()
            .NotEmpty()
            .When(d => d.Id == Guid.Empty)
            .Matches(IsPasswordComplex())
                    .WithMessage("Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.");

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
        //private bool BeUniqueEmail(DoctorDto dto, string email)
        //{
        //    var existingDoctor = _doctorRepository.GetByIdAsync(dto.Id);

        //    if (existingDoctor != null && existingDoctor.Result.Email.Equals(email, StringComparison.OrdinalIgnoreCase))
        //    {
        //        return true;
        //    }
        //    return !_userRepository.IsEmailTaken(email);
        //}

        //private bool BeUniqueUsername(DoctorDto dto, string username)
        //{
        //    var existingDoctor = _doctorRepository.GetByIdAsync(dto.Id);

        //    if (existingDoctor != null && existingDoctor.Result.UserName.Equals(username, StringComparison.OrdinalIgnoreCase))
        //    {
        //        return true;
        //    }
        //    return !_userRepository.IsUsernameTaken(username);
        //}
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
