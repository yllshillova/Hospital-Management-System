using Application.Nurses;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using static Application.Nurses.Create;
using static Application.Nurses.Delete;
using static Application.Nurses.Details;
using static Application.Nurses.Edit;
using static Application.Nurses.GetNursesCount;
using static Application.Nurses.List;

namespace API.Controllers
{
    public class NursesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetNurses()
        {
            return HandleResult(await Mediator.Send(new GetNursesQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNurseById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetNurseByIdQuery(id)));
        }

        [HttpGet("Count")]
        public async Task<IActionResult> GetNursesCount()
        {
            return HandleResult(await Mediator.Send(new GetNursesCountQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateNurse([FromForm]NurseDto Nurse)
        {
            return HandleResult(await Mediator.Send(new CreateNurseCommand(Nurse)));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditNurse(Guid id, [FromForm] NurseDto Nurse)
        {
            Nurse.Id = id;
            return HandleResult(await Mediator.Send(new UpdateNurseCommand(Nurse)));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNurse(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteNurseCommand(id)));
        }

    }
}
