using Application.Staff;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using static Application.Staff.Create;
using static Application.Staff.Delete;
using static Application.Staff.Details;
using static Application.Staff.Edit;
using static Application.Staff.List;

namespace API.Controllers
{
    public class Staffontroller : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetStaff()
        {
            return HandleResult(await Mediator.Send(new GetStaffQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStaffById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetStaffByIdQuery(id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreateStaff(StaffDto Staff)
        {
            return HandleResult(await Mediator.Send(new CreateStaffCommand(Staff)));
        }
        [HttpPut]
        public async Task<IActionResult> EditStaff(Guid Id, StaffDto Staff)
        {
            Staff.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateStaffCommand(Staff)));
        }
        [HttpDelete]
        public async Task<IActionResult> Staff(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteStaffCommand(Id)));
        }

    }
}
