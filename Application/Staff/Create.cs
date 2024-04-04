using Application.Core;
using Application.Staff;
using Application.Validators;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Staff
{
    public class Create
    {
        public record CreateStaffCommand(StaffDto Staff) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateStaffCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Staff).SetValidator(new StaffValidator());
            }
        }

        public class CreateStaffCommandHandler(IStaffRepository _staffRepository, IMapper _mapper) : IRequestHandler<CreateStaffCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateStaffCommand request, CancellationToken cancellationToken)
            {
                if (request.Staff is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again.");

                var staff = _mapper.Map<Domain.Entities.Staff>(request.Staff);
                if (staff is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                var result = await _staffRepository.CreateAsync(staff);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the staff! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
