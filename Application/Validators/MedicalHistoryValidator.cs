using Application.DTOs;
using FluentValidation;

namespace Application.Validators
{
    public class MedicalHistoryValidator : AbstractValidator<MedicalHistoryDto>
    {
        public MedicalHistoryValidator()
        {
            RuleFor(d => d.AppointmentDate).NotEmpty().MaximumLength(10).WithMessage("AppointmentDate field is required.")
                .Matches(@"^\d{2}/\d{2}$").WithMessage("AppointmentDate must be in the format MM/DD");
            RuleFor(d => d.Medications).NotEmpty().WithMessage("Medications field is required.")
            .MaximumLength(30).WithMessage("Medications cannot exceed 30 characters.");
            RuleFor(d => d.Surgeries).NotEmpty().MaximumLength(10).WithMessage("Surgeries field is required.");
            RuleFor(d => d.RiskFactors).NotEmpty().MaximumLength(30).WithMessage("RiskFactors field is required.");
            RuleFor(d => d.PatientId).NotEmpty().WithMessage("PatientId field is required.");
        }
    }
}
