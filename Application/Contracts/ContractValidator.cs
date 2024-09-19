using Application.BaseValidators;
using FluentValidation;

namespace Application.Contracts
{
    public class ContractValidator : AbstractValidator<ContractDto>
    {
        public ContractValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<ContractDto, string>()).SetValidator(new ValidLengthValidator<ContractDto, string>(4, 500));
            RuleFor(d => d.StartDate).SetValidator(new NotNullValidator<ContractDto, DateTime>());
            RuleFor(d => d.EmployeeId).SetValidator(new NotNullValidator<ContractDto, Guid>());

        }
    }
}
