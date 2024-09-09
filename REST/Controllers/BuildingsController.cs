using Application.Buildings;
using Microsoft.AspNetCore.Mvc;
using static Application.Buildings.Create;
using static Application.Buildings.List;

namespace API.Controllers
{
    public class BuildingsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBuidlings()
        {
            return HandleResult(await Mediator.Send(new GetBuildingsQuery()));
        }



        [HttpPost]
        public async Task<IActionResult> CreateBuidling([FromForm] BuildingDto Buidling)
        {
            return HandleResult(await Mediator.Send(new CreateBuildingCommand(Buidling)));
        }


    }
}
