using Application.Prescriptions;
using FluentValidation;

namespace Application.Validators
{
    public class PrescriptionValidator : AbstractValidator<PrescriptionDto>
    {
        public PrescriptionValidator()
        {
            RuleFor(d => d.Medicine).NotEmpty().WithMessage("The name of the medicine is required!")
                .MinimumLength(2).WithMessage("The medicine name should be at minimum 2 characters!");
            RuleFor(d => d.Dosage).NotEmpty().WithMessage("The dosage of the medicine is required!")
                .MinimumLength(6).WithMessage("The dosage should be at minimum 6 characters.");
            RuleFor(d => d.Duration).NotEmpty().WithMessage("The duration of the medicine is required!")
               .MinimumLength(6).WithMessage("The dosage should be at minimum 6 characters.");
            RuleFor(d => d.Frequency).NotEmpty().WithMessage("The frequency of the medicine is required.")
                .MinimumLength(6).WithMessage("The frequency should be at minimum 6 characters.");
            RuleFor(d => d.Route).NotEmpty().WithMessage("The route form of the medicine is required.")
                .MinimumLength(4).WithMessage("The route form should be at minimum 4 characters.");
            RuleFor(d => d.FoodRelation).NotEmpty().WithMessage("The food relation of the medicine is required.")
                .MinimumLength(4).WithMessage("The food relation should be at minimum 4 characters.");
            RuleFor(x => x.DoDont).NotNull().WithMessage("Do's and Don'ts list cannot be null.")
                .Must(HaveAtLeastOneItem).WithMessage("Do's and Don'ts list must have at least one item.");
            RuleFor(d => d.PatientId).NotEmpty().WithMessage("PatientId field is required.");
            RuleFor(d => d.DoctorId).NotEmpty().WithMessage("DoctorId field is required.");

        }
        private bool HaveAtLeastOneItem(IEnumerable<string> list)
        {
            return list != null && !list.Any();
        }
    }
}
