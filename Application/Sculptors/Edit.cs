using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Sculptors
{
    public class Edit
    {
        public record UpdateSculptorCommand(SculptorDto Sculptor) : IRequest<Result<Unit>>;

        public class UpdateSculptorCommandValidator : AbstractValidator<UpdateSculptorCommand>
        {
            public UpdateSculptorCommandValidator()
            {
                RuleFor(x => x.Sculptor).SetValidator(new SculptorValidator());
            }
        }

        public class UpdateSculptorCommandHandler(ISculptorRepository _SculptorRepository, IMapper _mapper) : IRequestHandler<UpdateSculptorCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateSculptorCommand request, CancellationToken cancellationToken)
            {
                var Sculptor = await _SculptorRepository.GetByIdAsync(request.Sculptor.Id);
                if (Sculptor is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                _mapper.Map(request.Sculptor, Sculptor);
                Sculptor.UpdatedAt = DateTime.Now;

                var result = await _SculptorRepository.UpdateAsync(Sculptor);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the Sculptor. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
