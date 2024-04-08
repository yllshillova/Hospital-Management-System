using Application.Base;
using FluentValidation;
using Infrastructure.Base.AppUserValidator;

namespace Application.Doctors
{
    public class DoctorValidator : AbstractValidator<DoctorDto>
    {
        public DoctorValidator()
        {
            ValidateCommonProperties();
         
            RuleFor(d => d.Specialization).NotEmpty().Length(2, 20).WithMessage("Specialization field is required.");
           
        }
        private bool BeAValidDate(DateTime? date)
        {
            return date.HasValue && date.Value.Date <= DateTime.UtcNow.Date;
        }
    }
}
