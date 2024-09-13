using Application.BaseValidators;
using FluentValidation;

namespace Application.Groups
{
    public class GroupValidator : AbstractValidator<GroupDto>
    {
        public GroupValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<GroupDto, string>()).SetValidator(new ValidLengthValidator<GroupDto, string>(4, 100));
            RuleFor(d => d.Description).SetValidator(new NotNullValidator<GroupDto, string>()).SetValidator(new ValidLengthValidator<GroupDto, string>(4, 100));

        }
    }
}

