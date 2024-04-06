using Application.Doctors;
using Application.Prescriptions;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using static Application.Prescriptions.Create;
using static Application.Prescriptions.Delete;
using static Application.Prescriptions.Details;
using static Application.Prescriptions.Edit;
using static Application.Prescriptions.List;

namespace API.Controllers
{
    public class PrescriptionsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPrescriptions()
        {
            return HandleResult(await Mediator.Send(new GetPrescriptionsQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrescriptionById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetPrescriptionByIdQuery(id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePrescription(PrescriptionDto Prescription)
        {
            return HandleResult(await Mediator.Send(new CreatePrescriptionCommand(Prescription)));
        }
        [HttpPut]
        public async Task<IActionResult> EditPrescription(Guid Id, PrescriptionDto Prescription)
        {
            Prescription.Id = Id;
            return HandleResult(await Mediator.Send(new UpdatePrescriptionCommand(Prescription)));
        }
        [HttpDelete]
        public async Task<IActionResult> DeletePrescription(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeletePrescriptionCommand(Id)));
        }

    }
}
