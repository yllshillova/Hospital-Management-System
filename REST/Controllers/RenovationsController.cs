using Application.Renovations;
using Microsoft.AspNetCore.Mvc;
using static Application.Renovations.Create;
using static Application.Renovations.Delete;
using static Application.Renovations.List;

namespace API.Controllers
{
    public class RenovationsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetRenovations()
        {
            return HandleResult(await Mediator.Send(new GetRenovationsQuery()));
        }



        [HttpPost]
        public async Task<IActionResult> CreateRenovation([FromForm] RenovationDto Renovation)
        {
            return HandleResult(await Mediator.Send(new CreateRenovationCommand(Renovation)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteRenovation(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteRenovationCommand(Id)));
        }



    }
}
