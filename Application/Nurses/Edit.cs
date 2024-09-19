using Application.Core;
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
            private readonly IUserRepository _userRepository;
            private readonly INurseRepository _nurseRepository;

            public UpdateNurseCommandValidator(IUserRepository userRepository, INurseRepository nurseRepository)
            {
                _userRepository = userRepository;
                _nurseRepository = nurseRepository;
                RuleFor(x => x.Nurse).SetValidator(new NurseValidator(_userRepository, _nurseRepository));
            }
        }

        public class UpdateNurseCommandHandler(INurseRepository _nurseRepository, IMapper _mapper) : IRequestHandler<UpdateNurseCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateNurseCommand request, CancellationToken cancellationToken)
            {
                var nurse = await _nurseRepository.GetByIdAsync(request.Nurse.Id);
                if (nurse is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                if (string.IsNullOrWhiteSpace(request.Nurse.Password))
                {
                    // If the password is not provided,  the existing password is maintained
                    request.Nurse.Password = nurse.PasswordHash;
                }

                _mapper.Map(request.Nurse, nurse);
                nurse.CreatedAt = request.Nurse.CreatedAt;
                nurse.UpdatedAt = DateTime.Now;

                var result = await _nurseRepository.UpdateAsync(nurse);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the nurse! Try again.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
