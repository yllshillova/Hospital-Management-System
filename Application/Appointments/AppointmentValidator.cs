using Application.BaseValidators;
using FluentValidation;

namespace Application.Appointments
{
    public class AppointmentValidator : AbstractValidator<AppointmentDto>
    {
        public AppointmentValidator()
        {
            RuleFor(d => d.CheckInDate).SetValidator(new NotNullValidator<AppointmentDto, DateTime>())
                .Must(BeAValidDate).WithMessage("Invalid check-in date format.")
                    .Must(BeInFuture).WithMessage("Check-in date must be in the future.");
            RuleFor(x => x.CheckOutDate).SetValidator(new NotNullValidator<AppointmentDto, DateTime>())
                .Must((dto, checkOutDate) => BeAfterCheckInDate(checkOutDate, dto))
                .WithMessage("Check-out date must be after check-in date.");
            RuleFor(d => d.Status).SetValidator(new NotNullValidator<AppointmentDto, string>())
                .SetValidator(new ValidLengthValidator<AppointmentDto, string>(5, 100));
            RuleFor(d => d.Reason).SetValidator(new NotNullValidator<AppointmentDto, string>())
                .SetValidator(new ValidLengthValidator<AppointmentDto, string>(5, 100));
            RuleFor(d => d.Notes).SetValidator(new NotNullValidator<AppointmentDto, string>())
                .SetValidator(new ValidLengthValidator<AppointmentDto, string>(5, 100));
            RuleFor(d => d.DoctorId).SetValidator(new NotNullValidator<AppointmentDto, Guid>());
            RuleFor(d => d.PatientId).SetValidator(new NotNullValidator<AppointmentDto, Guid>());
        }

        private bool BeAValidDate(DateTime date)
        {
            return date != default;
        }

        private bool BeInFuture(DateTime date)
        {
            return date > DateTime.Now;
        }

        private bool BeAfterCheckInDate(DateTime checkOutDate, AppointmentDto appointmentDto)
        {
            // Check that CheckOutDate is after CheckInDate
            return checkOutDate > appointmentDto.CheckInDate;
        }
    }
}
