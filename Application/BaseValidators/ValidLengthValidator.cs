using FluentValidation;
using FluentValidation.Validators;

namespace Application.BaseValidators
{
    internal class ValidLengthValidator<T, TProperty> : PropertyValidator<T, TProperty>
    {
        private readonly int _minLength;
        private readonly int _maxLength;

        public ValidLengthValidator(int minLength, int maxLength)
        {
            _minLength = minLength;
            _maxLength = maxLength;
        }

        public override string Name => "ValidLengthValidator";

        public override bool IsValid(ValidationContext<T> context, TProperty value)
        {
            if(value == null)
            {
                return true;
            }

            if(value is string stringValue)
            {
                int length = stringValue.Length;
                return length >= _minLength && length <= _maxLength;
            }
            return false;
        }

        protected override string GetDefaultMessageTemplate(string errorCode)
        {
            return $"'{{PropertyName}}' must be between {_minLength} and {_maxLength} characters.";
        }

    }
}
