using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.EmergencyContacts
{
    public class Edit
    {
        public record UpdateEmergencyContactCommand(EmergencyContactDto EmergencyContact) : IRequest<Result<Unit>>;

        public class UpdateEmergencyContactCommandValidator : AbstractValidator<UpdateEmergencyContactCommand>
        {
            public UpdateEmergencyContactCommandValidator()
            {
                RuleFor(x => x.EmergencyContact).SetValidator(new EmergencyContactValidator());
            }
        }

        public class UpdateEmergencyContactCommandHandler(IEmergencyContactRepository _emergencyContactRepository, IMapper _mapper) : IRequestHandler<UpdateEmergencyContactCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateEmergencyContactCommand request, CancellationToken cancellationToken)
            {
                var emergencyContact = await _emergencyContactRepository.GetByIdAsync(request.EmergencyContact.Id);
                if (emergencyContact is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                _mapper.Map(request.EmergencyContact, emergencyContact);
                emergencyContact.UpdatedAt = DateTime.UtcNow;
                var result = await _emergencyContactRepository.UpdateAsync(emergencyContact);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the emergency contact report! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
