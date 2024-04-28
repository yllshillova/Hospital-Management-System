using Application.Nurses;
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

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetNurseById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetNurseByIdQuery(Id)));
        }

        [HttpGet("Count")]
        public async Task<IActionResult> GetNursesCount()
        {
            return HandleResult(await Mediator.Send(new GetNursesCountQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateNurse(NurseDto Nurse)
        {
            return HandleResult(await Mediator.Send(new CreateNurseCommand(Nurse)));
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> EditNurse(Guid Id, NurseDto Nurse)
        {
            Nurse.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateNurseCommand(Nurse)));
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteNurse(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteNurseCommand(Id)));
        }

    }
}
