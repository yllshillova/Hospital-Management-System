using Application.Members;
using Microsoft.AspNetCore.Mvc;
using static Application.Members.Create;
using static Application.Members.Delete;
using static Application.Members.List;

namespace API.Controllers
{
    public class MembersController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetMembers()
        {
            return HandleResult(await Mediator.Send(new GetMembersQuery()));
        }



        [HttpPost]
        public async Task<IActionResult> CreateMember([FromForm] MemberDto Member)
        {
            return HandleResult(await Mediator.Send(new CreateMemberCommand(Member)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteMember(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteMemberCommand(Id)));
        }


    }
}
