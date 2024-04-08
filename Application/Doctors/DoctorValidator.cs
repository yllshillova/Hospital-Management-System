using Application.BaseValidators;
using FluentValidation;

namespace Application.Doctors
{
    public class DoctorValidator : AbstractValidator<DoctorDto>
    {
        public DoctorValidator()
        {
            RuleFor(d => d.Specialization).SetValidator(new NotNullValidator<DoctorDto,string>())
                                          .SetValidator(new ValidLengthValidator<DoctorDto,string>(4,100));
        }
    }
}
