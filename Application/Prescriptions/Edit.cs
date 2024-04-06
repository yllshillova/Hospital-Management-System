using Application.Core;
using Application.Validators;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Prescriptions
{
    public class Edit
    {
        public record UpdatePrescriptionCommand(PrescriptionDto Prescription) : IRequest<Result<Unit>>;

        public class UpdatePrescriptionCommandValidator : AbstractValidator<UpdatePrescriptionCommand>
        {
            public UpdatePrescriptionCommandValidator()
            {
                RuleFor(x => x.Prescription).SetValidator(new PrescriptionValidator());
            }
        }

        public class UpdatePrescriptionCommandHandler(IPrescriptionRepository _prescriptionRepository, IMapper _mapper) : IRequestHandler<UpdatePrescriptionCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdatePrescriptionCommand request, CancellationToken cancellationToken)
            {
                var prescription = await _prescriptionRepository.GetByIdAsync(request.Prescription.Id);
                if (prescription is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                _mapper.Map(request.Prescription, prescription);
                var result = await _prescriptionRepository.UpdateAsync(prescription);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the prescription! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
