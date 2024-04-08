using Application.Doctors;
using Microsoft.AspNetCore.Mvc;
using static Application.Doctors.Create;
using static Application.Doctors.Delete;
using static Application.Doctors.Details;
using static Application.Doctors.Edit;
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

        [HttpPost]
        public async Task<IActionResult> CreateDoctor(DoctorDto Doctor)
        {
            return HandleResult(await Mediator.Send(new CreateDoctorCommand(Doctor)));
        }
        [HttpPut]
        public async Task<IActionResult> EditDoctor(Guid Id,DoctorDto Doctor)
        {
            Doctor.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateDoctorCommand(Doctor)));
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteDoctor(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteDoctorCommand(Id)));
        }

    }
}
