using Application.Patients;
using Microsoft.AspNetCore.Mvc;
using static Application.Patients.Create;
using static Application.Patients.Delete;
using static Application.Patients.Details;
using static Application.Patients.Edit;
using static Application.Patients.GetLatestPatients;
using static Application.Patients.GetPatientsCount;
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
        public async Task<IActionResult> GetPatientById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetPatientByIdQuery(Id)));
        }

        [HttpGet("Count")]
        public async Task<IActionResult> GetPatientsCount()
        {
            return HandleResult(await Mediator.Send(new GetPatientsCountQuery()));
        }

        [HttpGet("Latest")]
        public async Task<IActionResult> GetLatestPatients()
        {
            return HandleResult(await Mediator.Send(new GetLatestPatientsQuery()));
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
