using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;
using System.Security.Claims;

namespace Application.Accounts.Users
{
    public class GetCurrentUser
    {
        public record GetCurrentUserQuery(ClaimsPrincipal Claims) : IRequest<Result<UserDto>>;

        public class GetCurrentUserQueryHandler(IUserRepository _userRepository,ITokenRepository _tokenRepository, IMapper _mapper) 
            : IRequestHandler<GetCurrentUserQuery, Result<UserDto>>
        {
            public async Task<Result<UserDto>> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
            {
                if (request.Claims is null) return Result<UserDto>.Failure(ErrorType.BadRequest, "Couldnt find the current user!");

                var userEmail = request.Claims.FindFirstValue(ClaimTypes.Email);

                if (string.IsNullOrEmpty(userEmail)) return Result<UserDto>.Failure(ErrorType.BadRequest, "User email couldn't be found!");

                var user = await _userRepository.GetUserByEmailAsync(userEmail);

                if (user is null) return Result<UserDto>.Failure(ErrorType.NotFound, "User is not found!");

                var userDto = _mapper.Map<UserDto>(user);
                
                if(userDto is null) return Result<UserDto>.Failure(ErrorType.BadRequest, "Something went wrong while mapping the User to UserDto!");
                userDto.Token = await _tokenRepository.CreateToken(user);

                return Result<UserDto>.Success(userDto);
            }
        }
    }
}
