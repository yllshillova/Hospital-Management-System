using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;
using Domain.Entities;

namespace Application.EmergencyContacts
{
    public class Create
    {
        public record CreateEmergencyContactCommand(EmergencyContactDto EmergencyContact) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateEmergencyContactCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.EmergencyContact).SetValidator(new EmergencyContactValidator());
            }
        }

        public class CreateEmergencyContactCommandHandler(IEmergencyContactRepository _emergencyContactRepository, IMapper _mapper) : IRequestHandler<CreateEmergencyContactCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateEmergencyContactCommand request, CancellationToken cancellationToken)
            {
                if (request.EmergencyContact is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again.");

                var emergencyContact = _mapper.Map<EmergencyContact>(request.EmergencyContact);
                if (emergencyContact is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");
                emergencyContact.CreatedAt = DateTime.UtcNow;
                emergencyContact.UpdatedAt = emergencyContact.CreatedAt;
                var result = await _emergencyContactRepository.CreateAsync(emergencyContact);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the emergencyContact! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
