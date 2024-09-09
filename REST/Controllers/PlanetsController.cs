using Application.Planets;
using Microsoft.AspNetCore.Mvc;
using static Application.Planets.Create;
using static Application.Planets.Details;
using static Application.Planets.Edit;
using static Application.Planets.List;

namespace API.Controllers
{
    public class PlanetsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPlanets()
        {
            return HandleResult(await Mediator.Send(new GetPlanetsQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetPlanetById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetPlanetByIdQuery(id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreatePlanet([FromForm] PlanetDto Planet)
        {
            return HandleResult(await Mediator.Send(new CreatePlanetCommand(Planet)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditPlanet(Guid Id, [FromForm] PlanetDto Planet)
        {
            Planet.Id = Id;
            return HandleResult(await Mediator.Send(new UpdatePlanetCommand(Planet)));
        }
    }
}
