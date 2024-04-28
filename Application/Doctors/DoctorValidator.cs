using Application.BaseValidators;
using FluentValidation;

namespace Application.Doctors
{
    public class DoctorValidator : AbstractValidator<DoctorDto>
    {
        public DoctorValidator()
        {
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
        }
        private bool BeAValidDate(DateTime? date)
        {
            return date.HasValue && date.Value.Date <= DateTime.UtcNow.Date;
        }
    }
}
