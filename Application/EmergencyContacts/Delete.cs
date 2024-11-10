using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.EmergencyContacts
{
    public class Delete
    {
        public record DeleteEmergencyContactCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteEmergencyContactCommandHandler(IEmergencyContactRepository _emergencyContactRepository) : IRequestHandler<DeleteEmergencyContactCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteEmergencyContactCommand request, CancellationToken cancellationToken)
            {
                var emergencyContact = await _emergencyContactRepository.GetByIdAsync(request.Id);
                if (emergencyContact is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                var result = await _emergencyContactRepository.DeleteAsync(emergencyContact);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the emergency contact! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
