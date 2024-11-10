using Application.Visits;
using Microsoft.AspNetCore.Mvc;
using static Application.Appointments.GetLatestVisits;
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
        public async Task<IActionResult> GetVisits(Guid? doctorId)
        {
            return HandleResult(await Mediator.Send(new GetVisitsQuery(doctorId)));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetVisitById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetVisitByIdQuery(id)));
        }

        [HttpGet("Latest")]
        public async Task<IActionResult> GetLatestVisits()
        {
            return HandleResult(await Mediator.Send(new GetLatestVisitsQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVisit([FromForm] VisitDto Visit)
        {
            return HandleResult(await Mediator.Send(new CreateVisitCommand(Visit)));
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> EditVisit(Guid Id, [FromForm] VisitDto Visit)
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
