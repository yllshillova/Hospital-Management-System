using Application.Buildings;
using Microsoft.AspNetCore.Mvc;
using static Application.Buildings.Create;
using static Application.Buildings.List;

namespace API.Controllers
{
    public class BuildingsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBuildings()
        {
            return HandleResult(await Mediator.Send(new GetBuildingsQuery()));
        }



        [HttpPost]
        public async Task<IActionResult> CreateBuilding([FromForm] BuildingDto Building)
        {
            return HandleResult(await Mediator.Send(new CreateBuildingCommand(Building)));
        }




    }
}
