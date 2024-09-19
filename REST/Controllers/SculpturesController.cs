using Application.Sculptures;
using Microsoft.AspNetCore.Mvc;
using static Application.Sculptures.Create;
using static Application.Sculptures.Delete;
using static Application.Sculptures.List;

namespace API.Controllers
{
    public class SculpturesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetSculptures(string? name)
        {
            return HandleResult(await Mediator.Send(new GetSculpturesQuery(name)));
        }



        [HttpPost]
        public async Task<IActionResult> CreateSculpture([FromForm] SculptureDto Sculpture)
        {
            return HandleResult(await Mediator.Send(new CreateSculptureCommand(Sculpture)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteSculpture(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteSculptureCommand(Id)));
        }


    }
}
