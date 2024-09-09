using Application.BaseValidators;
using Application.Contracts;
using FluentValidation;

namespace Application.Orders
{
    public class OrderValidator : AbstractValidator<OrderDto>
    {
        public OrderValidator()
        {
            RuleFor(d => d.QuantityOrdered)
                .SetValidator(new NotNullValidator<OrderDto, int>())
                .GreaterThanOrEqualTo(0);

            RuleFor(d => d.ProductId).SetValidator(new NotNullValidator<OrderDto, Guid>());
            RuleFor(d => d.Date)
                .NotNull()
                .Must(BeAValidDate)
                .WithMessage("Order Date must be a valid date and cannot be in the future.");
        }

        private bool BeAValidDate(DateTime orderDate)
        {
            return orderDate <= DateTime.Now; // Ensure order date is not in the future
        }
    }
}
