using Application.EmergencyContacts;
using Microsoft.AspNetCore.Mvc;
using static Application.EmergencyContacts.Create;
using static Application.EmergencyContacts.Delete;
using static Application.EmergencyContacts.Details;
using static Application.EmergencyContacts.Edit;
using static Application.EmergencyContacts.List;
using static Application.EmergencyContacts.GetByPatientId;

namespace API.Controllers
{
    public class EmergencyContactsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEmergencyContacts()
        {
            return HandleResult(await Mediator.Send(new GetEmergencyContactsQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetEmergencyContactById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetEmergencyContactByIdQuery(Id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateEmergencyContact([FromForm] EmergencyContactDto EmergencyContact)
        {
            return HandleResult(await Mediator.Send(new CreateEmergencyContactCommand(EmergencyContact)));
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> EditEmergencyContact(Guid Id, [FromForm] EmergencyContactDto EmergencyContact)
        {
            EmergencyContact.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateEmergencyContactCommand(EmergencyContact)));
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteEmergencyContact(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteEmergencyContactCommand(Id)));
        }

        [HttpGet("patient/{PatientId}")]
        public async Task<IActionResult> GetEmergencyContactsByPatientId(Guid PatientId)
        {
            return HandleResult(await Mediator.Send(new GetEmergencyContactsByPatientIdQuery(PatientId)));
        }
    }
}
