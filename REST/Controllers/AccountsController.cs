using Application.Accounts.Login;
using Application.Accounts.Register;
using Microsoft.AspNetCore.Mvc;
using static Application.Accounts.Login.Login;
using static Application.Accounts.Register.Register;
using static Application.Accounts.Users.GetCurrentUser;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : BaseApiController
    {
        [HttpGet("currentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            return HandleResult(await Mediator.Send(new GetCurrentUserQuery(User)));
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm]LoginDto loginDto)
        {
            return HandleResult(await Mediator.Send(new LoginCommand(loginDto)));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm]RegisterDto registerDto)
        {
            return HandleResult(await Mediator.Send(new RegisterCommand(registerDto)));
        }
      
    }
}
