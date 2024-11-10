using Application.BaseValidators;
using Domain.Contracts;
using FluentValidation;

namespace Application.Doctors
{
    public class DoctorValidator : AbstractValidator<DoctorDto>
    {
        private readonly IUserRepository _userRepository;
        private readonly IDoctorRepository _doctorRepository;

        public DoctorValidator(IUserRepository userRepository, IDoctorRepository doctorRepository)
        {
            _userRepository = userRepository;
            _doctorRepository = doctorRepository;
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
                                   .Must((doctor,username) => BeUniqueUsername(doctor.Id,username)).WithMessage("Username is taken. Try another one!");
            RuleFor(d => d.Email).SetValidator(new NotNullValidator<DoctorDto, string>())
                                 .SetValidator(new EmailValidator<DoctorDto, string>())
                                 .Must((doctor,email) => BeUniqueEmail(doctor.Id,email)).WithMessage("Email is taken. Try another one!");

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
        private bool BeUniqueEmail(Guid doctorId, string email)
        {
            // Check if email is being updated
            var existingDoctor = _doctorRepository.GetDoctorById(doctorId);
            if (existingDoctor != null && existingDoctor.Email.Equals(email, StringComparison.OrdinalIgnoreCase))
            {
                // If the email is the same as the existing one, skip uniqueness check
                return true;
            }

            // Otherwise, check for uniqueness
            return !_userRepository.IsEmailTaken(email);
        }

        private bool BeUniqueUsername(Guid doctorId, string username)
        {
            // Check if username is being updated
            var existingDoctor = _doctorRepository.GetDoctorById(doctorId);
            if (existingDoctor != null && existingDoctor.UserName.Equals(username, StringComparison.OrdinalIgnoreCase))
            {
                // If the username is the same as the existing one, skip uniqueness check
                return true;
            }

            // Otherwise, check for uniqueness
            return !_userRepository.IsUsernameTaken(username);
        }
        //private bool BeUniqueEmail(string email)
        //{
        //    // Use the synchronous method from the user repository
        //    return !_userRepository.IsEmailTaken(email);
        //}
        //private bool BeUniqueUsername(string username)
        //{
        //    // Use the synchronous method from the user repository
        //    return !_userRepository.IsUsernameTaken(username);
        //}


    }
}
