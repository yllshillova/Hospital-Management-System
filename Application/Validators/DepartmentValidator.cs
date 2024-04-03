using Application.DTOs;
using FluentValidation;

namespace Application.Validators
{
    public class DepartmentValidator : AbstractValidator<DepartmentDto>
    {
        public DepartmentValidator()
        {
            RuleFor(d => d.Id).NotEmpty().WithMessage("Id is required.");
            RuleFor(d => d.Name).NotEmpty().Length(10, 250).WithMessage("Name field is required.");
            RuleFor(d => d.Employer_Count).NotEmpty().GreaterThan(0).WithMessage("Employer_Count field is required.");
            RuleFor(d => d.Dept_Head).NotEmpty().Length(10, 250).WithMessage("Dept_Head field is required.");
        }
    }
}
