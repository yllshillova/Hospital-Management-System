using Application.Satellites;
using Microsoft.AspNetCore.Mvc;
using static Application.Satellites.Create;
using static Application.Satellites.Delete;
using static Application.Satellites.GetSatellitesByPlanet;
using static Application.Satellites.List;

namespace API.Controllers
{
    public class SatellitesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetSatellites()
        {
            return HandleResult(await Mediator.Send(new GetSatellitesQuery()));
        }



        [HttpGet("GetByPlanet")]
        public async Task<IActionResult> GetSatellitesByPlanet([FromQuery] string PlanetName)
        {
            return HandleResult(await Mediator.Send(new GetSatellitesByPlanetNameQuery(PlanetName)));
        }



        [HttpPost]
        public async Task<IActionResult> CreateSatellite([FromForm] SatelliteDto Satellite)
        {
            return HandleResult(await Mediator.Send(new CreateSatelliteCommand(Satellite)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteSatellite(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteSatelliteCommand(Id)));
        }


    }
}
