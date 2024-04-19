using Application.Patients;
using Microsoft.AspNetCore.Mvc;
using static Application.Patients.Create;
using static Application.Patients.Delete;
using static Application.Patients.Details;
using static Application.Patients.Edit;
using static Application.Patients.List;

namespace API.Controllers
{
    public class PatientsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPatients()
        {
            return HandleResult(await Mediator.Send(new GetPatientsQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetPatientById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetPatientByIdQuery(id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePatient([FromForm] PatientDto Patient)
        {
            return HandleResult(await Mediator.Send(new CreatePatientCommand(Patient)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditPatient(Guid Id, [FromForm] PatientDto Patient)
        {
            Patient.Id = Id;
            return HandleResult(await Mediator.Send(new UpdatePatientCommand(Patient)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeletePatient(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeletePatientCommand(Id)));
        }
    }
}
