using Application.Accounts.Register;
using Microsoft.AspNetCore.Mvc;
using static Application.Accounts.Register.Register;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : BaseApiController
    {

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            return HandleResult(await Mediator.Send(new RegisterCommand(registerDto)));
        }
    }
}
