﻿using Application.DTOs;
using Application.EmergencyContacts;
using FluentValidation;

namespace Application.BaseValidators
{
    public class EmergencyContactValidator : AbstractValidator<EmergencyContactDto>
    {
        public EmergencyContactValidator()
        {
            RuleFor(d => d.ContactName).NotEmpty().Length(3, 250).WithMessage("ContactName field is required.");
            RuleFor(d => d.Relation).NotEmpty().Length(50).WithMessage("Relation field is required.");
            RuleFor(d => d.PhoneNumber).NotEmpty().WithMessage("PhoneNumber field is required.");
            RuleFor(d => d.PatientId).NotEmpty().WithMessage("PatientID field is required.");
        }
    }
}
