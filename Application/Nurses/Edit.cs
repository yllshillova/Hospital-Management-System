using Application.Core;
using Application.Validators;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Nurses
{
    public class Edit
    {
        public record UpdateNurseCommand(NurseDto Nurse) : IRequest<Result<Unit>>;

        public class UpdateNurseCommandValidator : AbstractValidator<UpdateNurseCommand>
        {
            public UpdateNurseCommandValidator()
            {
                RuleFor(x => x.Nurse).SetValidator(new NurseValidator());
            }
        }

        public class UpdateNurseCommandHandler(INurseRepository _nurseRepository, IMapper _mapper) : IRequestHandler<UpdateNurseCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateNurseCommand request, CancellationToken cancellationToken)
            {
                var nurse = await _nurseRepository.GetByIdAsync(request.Nurse.Id);
                if (nurse is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                _mapper.Map(request.Nurse, nurse);
                var result = await _nurseRepository.UpdateAsync(nurse);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the doctor! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
