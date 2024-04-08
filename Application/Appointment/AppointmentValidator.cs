using FluentValidation;

namespace Application.Appointment
{
    public class AppointmentValidator : AbstractValidator<AppointmentDto>
    {
        public AppointmentValidator()
        {
            RuleFor(d => d.CheckInDate).NotEmpty().WithMessage("Check-in date is required.")
                .Must(BeAValidDate).WithMessage("Invalid check-in date format.")
                    .Must(BeInFuture).WithMessage("Check-in date must be in the future.");
            RuleFor(x => x.CheckOutDate).NotEmpty().WithMessage("Check-out date is required.")
                .Must((dto, checkOutDate) => BeAfterCheckInDate(checkOutDate, dto))
                .WithMessage("Check-out date must be after check-in date.");


            RuleFor(d => d.Status).NotEmpty().Length(5, 30).WithMessage("Status field is required.");
            RuleFor(d => d.Reason).NotEmpty().Length(5, 30).WithMessage("Reason field is required.");
            RuleFor(d => d.Notes).NotEmpty().Length(5, 30).WithMessage("Notes field is required.");
            RuleFor(d => d.DoctorId).NotEmpty().WithMessage("DoctorId field is required.");
            RuleFor(d => d.PatientId).NotEmpty().WithMessage("PatientId field is required.");
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
