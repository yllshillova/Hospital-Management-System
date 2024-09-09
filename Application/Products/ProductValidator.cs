using Application.BaseValidators;
using FluentValidation;

namespace Application.Employees
{
    public class ProductValidator : AbstractValidator<ProductDto>
    {
        public ProductValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<ProductDto, string>()).SetValidator(new ValidLengthValidator<ProductDto, string>(4, 500));
            RuleFor(d => d.Quantity)
                .SetValidator(new NotNullValidator<ProductDto, int>())
                .GreaterThanOrEqualTo(0);
            RuleFor(d => d.Price)
                 .SetValidator(new NotNullValidator<ProductDto, double>())
                 .GreaterThanOrEqualTo(0);
        }
    }
}
