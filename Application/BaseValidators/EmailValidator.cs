using FluentValidation;
using FluentValidation.Validators;

namespace Application.BaseValidators
{
    public class EmailValidator<T, TProperty> : PropertyValidator<T, TProperty>
    {
        private readonly string _emailPattern = @"^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

        public override string Name => "EmailValidator";

        public override bool IsValid(ValidationContext<T> context, TProperty value)
        {
            if (value == null)
            {
                return false; 
            }

            if (value is string emailValue)
            {
                return System.Text.RegularExpressions.Regex.IsMatch(emailValue, _emailPattern);
            }

            return false;
        }

        protected override string GetDefaultMessageTemplate(string errorCode)
        {
            return "'{PropertyName}' is not a valid email address.";
        }
    }
}