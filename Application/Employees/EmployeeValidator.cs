using Application.BaseValidators;
using FluentValidation;

namespace Application.Employees
{
    public class EmployeeValidator : AbstractValidator<EmployeeDto>
    {
        public EmployeeValidator()
        {
            RuleFor(d => d.FullName).SetValidator(new NotNullValidator<EmployeeDto, string>()).SetValidator(new ValidLengthValidator<EmployeeDto, string>(4, 500));

        }
    }
}
