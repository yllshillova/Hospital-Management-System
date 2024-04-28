using Application.Doctors;
using Microsoft.AspNetCore.Mvc;
using static Application.Doctors.Create;
using static Application.Doctors.Delete;
using static Application.Doctors.Details;
using static Application.Doctors.Edit;
using static Application.Doctors.GetPatientsCount;
using static Application.Doctors.List;

namespace API.Controllers
{
    public class DoctorsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetDoctors()
        {
            return HandleResult(await Mediator.Send(new GetDoctorsQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctorById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetDoctorByIdQuery(id)));
        }

        [HttpGet("Count")]
        public async Task<IActionResult> GetDoctorsCount()
        {
            return HandleResult(await Mediator.Send(new GetDoctorsCountQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDoctor([FromForm] DoctorDto Doctor)
        {
            return HandleResult(await Mediator.Send(new CreateDoctorCommand(Doctor)));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditDoctor(Guid id, [FromForm] DoctorDto Doctor)
        {
            Doctor.Id = id;
            return HandleResult(await Mediator.Send(new UpdateDoctorCommand(Doctor)));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteDoctorCommand(id)));
        }

    }
}
