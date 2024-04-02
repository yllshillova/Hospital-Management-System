using Application.DTOs;
using FluentValidation;

namespace Application.Validators
{
    public class LabTestValidator : AbstractValidator<LabTestDto>
    {
        public LabTestValidator()
        {
            RuleFor(d => d.Id).NotEmpty().WithMessage("Id is required.");
            RuleFor(d => d.Type).NotEmpty().Length(10, 100).WithMessage("Type field is required.");
            RuleFor(d => d.Results).NotEmpty().WithMessage("Results field is required.");
            RuleFor(d => d.Notes).NotEmpty().WithMessage("Notes field is required.");
            RuleFor(d => d.PrescriptionId).NotEmpty().WithMessage("PrescriptionId field is required.");
        }
    }
}

