using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Nurses
{
    public class Create
    {
        public record CreateNurseCommand(NurseDto Nurse) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateNurseCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Nurse).SetValidator(new NurseValidator());
            }
        }

        public class CreateNurseCommandHandler(INurseRepository _nurseRepository, IMapper _mapper) : IRequestHandler<CreateNurseCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateNurseCommand request, CancellationToken cancellationToken)
            {
                if (request.Nurse is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again.");

                var nurse = _mapper.Map<Nurse>(request.Nurse);
                if (nurse is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");
                
                nurse.CreatedAt = DateTime.Now;
                nurse.UpdatedAt = nurse.CreatedAt;
               
                var result = await _nurseRepository.CreateAsync(nurse);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the nurse! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
