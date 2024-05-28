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
            private readonly IUserRepository _userRepository;
            public CommandValidator(IUserRepository userRepository)
            {
                _userRepository = userRepository;

                RuleFor(x => x.Nurse)
                    .SetValidator(new NurseValidator(_userRepository));
            }
        }

        public class CreateNurseCommandHandler(ITokenRepository _tokenRepository, IUserRepository _userRepository, IMapper _mapper) : IRequestHandler<CreateNurseCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateNurseCommand request, CancellationToken cancellationToken)
            {
                if (request.Nurse is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var nurse = _mapper.Map<Nurse>(request.Nurse);
                nurse.CreatedAt = DateTime.Now;
                nurse.UpdatedAt = DateTime.Now;

                var nurseCreation = await _userRepository.CreateUserWithRoleAsync(nurse, request.Nurse.Password, "Nurse");
                if (!nurseCreation)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the nurse.");

                var (accessToken, refreshToken) = await _tokenRepository.CreateTokens(nurse);

                var nurseDto = _mapper.Map<NurseDto>(nurse);
                nurseDto.AccessToken = accessToken;
                nurseDto.RefreshToken = refreshToken;
                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
