using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Visits
{
    public class Create
    {
        public record CreateVisitCommand(VisitDto Visit) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateVisitCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Visit).SetValidator(new VisitValidator());
            }
        }

        public class CreateVisitCommandHandler(IVisitRepository _visitRepository, IAppointmentRepository _appointmentRepository, IMapper _mapper) : IRequestHandler<CreateVisitCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateVisitCommand request, CancellationToken cancellationToken)
            {
                if (request.Visit is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again.");

                var visit = _mapper.Map<Visit>(request.Visit);
                if (visit is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                visit.CreatedAt = DateTime.Now;
                visit.UpdatedAt = visit.CreatedAt;

                var intersectingAppointment = await _appointmentRepository.GetIntersectingAppointment(visit.PatientId, visit.DoctorId);
                if (intersectingAppointment == null) return Result<Unit>.Failure(ErrorType.NotFound, "Appointment associated with the visit not found!");

                intersectingAppointment.Status = "Completed";
                var appointmentUpdateResult = await _appointmentRepository.UpdateAsync(intersectingAppointment);

                if (!appointmentUpdateResult) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update appointment status! Try again.");

                var result = await _visitRepository.CreateAsync(visit);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the visit report! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
