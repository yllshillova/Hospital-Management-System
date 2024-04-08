using Application.Core;
using Application.BaseValidators;
using Application.Visits;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Visits
{
    public class Edit
    {
        public record UpdateVisitCommand(VisitDto Visit) : IRequest<Result<Unit>>;

        public class UpdateVisitCommandValidator : AbstractValidator<UpdateVisitCommand>
        {
            public UpdateVisitCommandValidator()
            {
                RuleFor(x => x.Visit).SetValidator(new VisitValidator());
            }
        }

        public class UpdateVisitCommandHandler(IVisitRepository _visitRepository, IMapper _mapper) : IRequestHandler<UpdateVisitCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateVisitCommand request, CancellationToken cancellationToken)
            {
                var visit = await _visitRepository.GetByIdAsync(request.Visit.Id);
                if (visit is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                _mapper.Map(request.Visit, visit);
                visit.UpdatedAt = DateTime.Now;

                var result = await _visitRepository.UpdateAsync(visit);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the visit report! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
