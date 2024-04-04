using Application.Core;
using Application.Validators;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Staff
{
    public class Edit
    {
        public record UpdateStaffCommand(StaffDto Staff) : IRequest<Result<Unit>>;

        public class UpdateStaffCommandValidator : AbstractValidator<UpdateStaffCommand>
        {
            public UpdateStaffCommandValidator()
            {
                RuleFor(x => x.Staff).SetValidator(new StaffValidator());
            }
        }

        public class UpdateDoctorCommandHandler(IStaffRepository _staffRepository, IMapper _mapper) : IRequestHandler<UpdateStaffCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateStaffCommand request, CancellationToken cancellationToken)
            {
                var staff = await _staffRepository.GetByIdAsync(request.Staff.Id);
                if (staff is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                _mapper.Map(request.Staff, staff);
                var result = await _staffRepository.UpdateAsync(staff);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the staff! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
