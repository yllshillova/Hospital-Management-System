using Application.Rooms;
using Microsoft.AspNetCore.Mvc;
using static Application.Rooms.Create;
using static Application.Rooms.Delete;
using static Application.Rooms.Details;
using static Application.Rooms.Edit;
using static Application.Rooms.List;

namespace API.Controllers
{
    public class RoomsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            return HandleResult(await Mediator.Send(new GetRoomsQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomById(Guid Id, RoomDto Room)
        {
            return HandleResult(await Mediator.Send(new GetRoomByIdQuery(Id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom(RoomDto Room)
        {
            return HandleResult(await Mediator.Send(new CreateRoomCommand(Room)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditRoom(Guid Id, RoomDto Room)
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
