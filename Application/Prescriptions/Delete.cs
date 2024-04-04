using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using MediatR;

namespace Application.Prescriptions
{
    public class Delete
    {
        public record DeletePrescriptionCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeletePrescriptionCommandHandler(IPrescriptionRepository _prescriptionRepository) : IRequestHandler<DeletePrescriptionCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeletePrescriptionCommand request, CancellationToken cancellationToken)
            {
                var prescription = await _prescriptionRepository.GetByIdAsync(request.Id);
                if (prescription is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var result = await _prescriptionRepository.DeleteAsync(prescription);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the prescription! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
