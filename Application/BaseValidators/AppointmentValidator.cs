using Application.Appointment;
using FluentValidation;

namespace Application.BaseValidators
{
    public class AppointmentValidator : AbstractValidator<AppointmentDto>
    {
        public AppointmentValidator()
        {
            RuleFor(d => d.CheckInDate)
            .NotEmpty().WithMessage("Check-in date is required.")
            .Must(BeAValidDate).WithMessage("Invalid check-in date format.")
            .Must(BeInFuture).WithMessage("Check-in date must be in the future.");
            RuleFor(x => x.CheckOutDate)
            .NotEmpty().WithMessage("Check-out date is required.")
            .Must(BeAValidDate).WithMessage("Invalid check-out date format.")
            .Must(BeAfterCheckInDate).WithMessage("Check-out date must be after check-in date.");
            RuleFor(d => d.Status).NotEmpty().Length(10, 250).WithMessage("Status field is required.");
            RuleFor(d => d.Reason).NotEmpty().Length(50).WithMessage("Reason field is required.");
            RuleFor(d => d.Notes).NotEmpty().Length(50).WithMessage("Notes field is required.");
            RuleFor(d => d.DoctorId).NotEmpty().WithMessage("DoctorId field is required.");
            RuleFor(d => d.PatientId).NotEmpty().WithMessage("PatientId field is required.");
        }

        private bool BeAValidDate(DateTime date)
        {
            return date != default(DateTime);
        }

        private bool BeInFuture(DateTime date)
        {
            return date > DateTime.Now;
        }

        //TODO: implement this 
        //private bool BeAfterCheckInDate(DateTime checkOutDate, AppointmentDto appointmentDto)
        //{
        //    return checkOutDate > appointmentDto.CheckInDate;
        //}
        private bool BeAfterCheckInDate(DateTime time)
        {
            throw new NotImplementedException();
        }
    }
}
