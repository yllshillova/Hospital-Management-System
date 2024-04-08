using Application.Visits;
using Microsoft.AspNetCore.Mvc;
using static Application.Visits.Create;
using static Application.Visits.Delete;
using static Application.Visits.Details;
using static Application.Visits.Edit;
using static Application.Visits.List;

namespace API.Controllers
{
    public class VisitsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetVisits()
        {
            return HandleResult(await Mediator.Send(new GetVisitsQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVisitById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetVisitByIdQuery(id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVisit(VisitDto Visit)
        {
            return HandleResult(await Mediator.Send(new CreateVisitCommand(Visit)));
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> EditVisit(Guid Id, VisitDto Visit)
        {
            Visit.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateVisitCommand(Visit)));
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteVisit(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteVisitCommand(Id)));
        }

    }
}
