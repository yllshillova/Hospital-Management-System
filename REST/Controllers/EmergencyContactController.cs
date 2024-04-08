using Application.EmergencyContacts;
using Microsoft.AspNetCore.Mvc;
using static Application.EmergencyContacts.Create;
using static Application.EmergencyContacts.Delete;
using static Application.EmergencyContacts.Details;
using static Application.EmergencyContacts.Edit;
using static Application.EmergencyContacts.List;

namespace API.Controllers
{
    public class EmergencyContactsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEmergencyContacts()
        {
            return HandleResult(await Mediator.Send(new GetEmergencyContactsQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmergencyContactById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetEmergencyContactByIdQuery(id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmergencyContact(EmergencyContactDto EmergencyContact)
        {
            return HandleResult(await Mediator.Send(new CreateEmergencyContactCommand(EmergencyContact)));
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> EditEmergencyContact(Guid Id, EmergencyContactDto EmergencyContact)
        {
            EmergencyContact.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateEmergencyContactCommand(EmergencyContact)));
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteEmergencyContact(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteEmergencyContactCommand(Id)));
        }

    }
}
