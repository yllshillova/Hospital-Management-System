using Domain.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Application.Base
{
    public class AppUserValidator : AbstractValidator<AppUser>
    {
        public AppUserValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;
        }

        public void ValidateCommonProperties()
        {
            RuleFor(d => d.Name).NotEmpty().Length(2, 10).WithMessage("Name field is required.");
            RuleFor(d => d.LastName).NotEmpty().Length(2, 10).WithMessage("LastName field is required.");
            RuleFor(d => d.Residence).NotEmpty().Length(2, 10).WithMessage("Residence field is required.");
            RuleFor(d => d.Address).NotEmpty().Length(2, 10).WithMessage("Address field is required.");
            RuleFor(d => d.Gender).NotEmpty().Length(0, 8).WithMessage("Gender field is required.");
            RuleFor(d => d.Birthday).NotEmpty().Must(BeAValidDate).WithMessage("Birthday field is required and must be a valid date.");
            RuleFor(d => d.DepartmentId).NotEmpty().WithMessage("DepartmentId field is required.");
            RuleFor(e => e.Gender).NotEmpty().Length(0, 8).WithMessage("Gender field is required and must be between 0 and 8 characters.");
            RuleFor(e => e.Birthday).NotEmpty().Must(BeAValidDate).WithMessage("Birthday field is required and must be a valid date.");
        }

        private bool BeAValidDate(DateTime? date)
        {
            return date.HasValue && date.Value.Date <= DateTime.UtcNow.Date;
        }
    }
}
