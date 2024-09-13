using Application.Groups;
using Microsoft.AspNetCore.Mvc;
using static Application.Groups.Create;
using static Application.Groups.Details;
using static Application.Groups.Edit;
using static Application.Groups.List;

namespace API.Controllers
{
    public class GroupsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetGroups()
        {
            return HandleResult(await Mediator.Send(new GetGroupsQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetGroupById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetGroupByIdQuery(id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromForm] GroupDto Group)
        {
            return HandleResult(await Mediator.Send(new CreateGroupCommand(Group)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditGroup(Guid Id, [FromForm] GroupDto Group)
        {
            Group.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateGroupCommand(Group)));
        }
    }
}
