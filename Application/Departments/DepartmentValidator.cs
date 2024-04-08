using Application.BaseValidators;
using FluentValidation;

namespace Application.Departments
{
    public class DepartmentValidator : AbstractValidator<DepartmentDto>
    {
        public DepartmentValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<DepartmentDto,string>())
                                .SetValidator(new ValidLengthValidator<DepartmentDto,string>(4,30));
        }
    }
}
