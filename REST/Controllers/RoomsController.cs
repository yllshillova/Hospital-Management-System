using Application.Rooms;
using Microsoft.AspNetCore.Mvc;
using static Application.Rooms.AssignPatient;
using static Application.Rooms.Create;
using static Application.Rooms.Delete;
using static Application.Rooms.Details;
using static Application.Rooms.Edit;
using static Application.Rooms.List;
using static Application.Rooms.RemovePatient;

namespace API.Controllers
{
    public class RoomsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            return HandleResult(await Mediator.Send(new GetRoomsQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetRoomById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetRoomByIdQuery(Id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromForm] RoomDto Room)
        {
            return HandleResult(await Mediator.Send(new CreateRoomCommand(Room)));
        }
        [HttpPost("AssignPatient")]
        public async Task<IActionResult> AssignPatient(Guid PatientId, Guid DoctorId)
        {
            return HandleResult(await Mediator.Send(new AssignPatientCommand(PatientId, DoctorId)));
        }

        [HttpDelete("RemovePatient/{PatientId}")]
        public async Task<IActionResult> RemovePatient(Guid PatientId)
        {
            return HandleResult(await Mediator.Send(new RemovePatientCommand(PatientId)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditRoom(Guid Id, [FromForm] RoomDto Room)
        {
            Room.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateRoomCommand(Room)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteRoom(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteRoomCommand(Id)));
        }
    }
}
