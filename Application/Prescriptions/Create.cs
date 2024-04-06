using Application.Core;
using Application.Validators;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Prescriptions
{
    public class Create
    {
        public record CreatePrescriptionCommand(PrescriptionDto Prescription) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreatePrescriptionCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Prescription).SetValidator(new PrescriptionValidator());
            }
        }

        public class CreatePrescriptionCommandHandler(IPrescriptionRepository _prescriptionRepository, IMapper _mapper) : IRequestHandler<CreatePrescriptionCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreatePrescriptionCommand request, CancellationToken cancellationToken)
            {
                if (request.Prescription is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again.");

                var prescription = _mapper.Map<Prescription>(request.Prescription);
                if (prescription is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                var result = await _prescriptionRepository.CreateAsync(prescription);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the prescription! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
