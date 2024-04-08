using FluentValidation;

namespace Application.Nurses
{
    public class NurseValidator : AbstractValidator<NurseDto>
    {
        public NurseValidator()
        {

            RuleFor(d => d.Name).NotEmpty().Length(2, 10).WithMessage("Name field is required.");
            RuleFor(d => d.LastName).NotEmpty().Length(2, 10).WithMessage("Name field is required.");
            RuleFor(d => d.Residence).NotEmpty().Length(2, 10).WithMessage("Residence field is required.");
            RuleFor(d => d.Address).NotEmpty().Length(2, 10).WithMessage("Address field is required.");
            RuleFor(d => d.Gender).NotEmpty().Length(1, 8).WithMessage("Gender field is required.");
            //isDeleted - ska nevoj 
            RuleFor(d => d.Birthday).NotNull().Must(BeAValidDate).WithMessage("Birthday must be a valid date.");
            RuleFor(d => d.DepartmentId).NotEmpty().WithMessage("DepartmentId field is required.");
        }
        private bool BeAValidDate(DateTime? date)
        {
            return date.HasValue && date.Value.Date <= DateTime.UtcNow.Date;
        }
    }
}
