using Application.Revistat;
using Microsoft.AspNetCore.Mvc;
using static Application.Revistas.Create;
using static Application.Revistas.List;

namespace API.Controllers
{
    public class RevistatController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetRevistat()
        {
            return HandleResult(await Mediator.Send(new GetRevistatQuery()));
        }



        [HttpPost]
        public async Task<IActionResult> CreateRevista([FromForm] RevistaDto Revista)
        {
            return HandleResult(await Mediator.Send(new CreateRevistaCommand(Revista)));
        }


    }
}
