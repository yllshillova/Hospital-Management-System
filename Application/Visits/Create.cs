using Application.Core;
using Application.Validators;
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

        public class CreateVisitCommandHandler(IVisitRepository _visitRepository, IMapper _mapper) : IRequestHandler<CreateVisitCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateVisitCommand request, CancellationToken cancellationToken)
            {
                if (request.Visit is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again.");

                var visit = _mapper.Map<Visit>(request.Visit);
                if (visit is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                if (visit.Doctor.IsDeleted == true) return Result<Unit>.Failure(ErrorType.BadRequest, "The doctor is not available for the moment! Select another doctor.");

                var result = await _visitRepository.CreateAsync(visit);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the visit report! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
