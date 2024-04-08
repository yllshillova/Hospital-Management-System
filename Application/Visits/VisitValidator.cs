using Application.BaseValidators;
using FluentValidation;

namespace Application.Visits
{
    public class VisitValidator : AbstractValidator<VisitDto>
    {
        public VisitValidator()
        {
            RuleFor(d => d.Complaints).SetValidator(new NotNullValidator<VisitDto, string>()).SetValidator(new ValidLengthValidator<VisitDto, string>(4, 500));
            RuleFor(d => d.Examinations).SetValidator(new NotNullValidator<VisitDto, string>()).SetValidator(new ValidLengthValidator<VisitDto, string>(4, 500));
            RuleFor(d => d.Diagnosis).SetValidator(new NotNullValidator<VisitDto, string>()).SetValidator(new ValidLengthValidator<VisitDto, string>(4, 1000));
            RuleFor(d => d.Therapy).SetValidator(new NotNullValidator<VisitDto, string>()).SetValidator(new ValidLengthValidator<VisitDto, string>(4, 500));
            RuleFor(d => d.RequiredAnalysis).SetValidator(new NotNullValidator<VisitDto, string>()).SetValidator(new ValidLengthValidator<VisitDto, string>(4, 500));
            RuleFor(d => d.Advice).SetValidator(new NotNullValidator<VisitDto, string>()).SetValidator(new ValidLengthValidator<VisitDto, string>(4, 700));
            RuleFor(d => d.Remarks).SetValidator(new NotNullValidator<VisitDto, string>()).SetValidator(new ValidLengthValidator<VisitDto, string>(4, 600));
            RuleFor(d => d.DoctorId).NotEmpty().WithMessage("DoctorId field is required.");
            RuleFor(d => d.PatientId).NotEmpty().WithMessage("PatientId field is required.");
        }
    }
}
