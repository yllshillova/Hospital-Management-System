using Application.BaseValidators;
using FluentValidation;

namespace Application.Members
{
    public class MemberValidator : AbstractValidator<MemberDto>
    {
        public MemberValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<MemberDto, string>()).SetValidator(new ValidLengthValidator<MemberDto, string>(4, 100));
            RuleFor(d => d.Role).SetValidator(new NotNullValidator<MemberDto, string>()).SetValidator(new ValidLengthValidator<MemberDto, string>(4, 100));
            RuleFor(d => d.GroupId).SetValidator(new NotNullValidator<MemberDto, Guid>());


        }
    }
}
