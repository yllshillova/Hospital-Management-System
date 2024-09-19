using Application.Sculptors;
using Microsoft.AspNetCore.Mvc;
using static Application.Sculptors.Create;
using static Application.Sculptors.Details;
using static Application.Sculptors.Edit;
using static Application.Sculptors.List;

namespace API.Controllers
{
    public class SculptorsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetSculptors()
        {
            return HandleResult(await Mediator.Send(new GetSculptorsQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetSculptorById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetSculptorByIdQuery(id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateSculptor([FromForm] SculptorDto Sculptor)
        {
            return HandleResult(await Mediator.Send(new CreateSculptorCommand(Sculptor)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditSculptor(Guid Id, [FromForm] SculptorDto Sculptor)
        {
            Sculptor.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateSculptorCommand(Sculptor)));
        }
    }
}
