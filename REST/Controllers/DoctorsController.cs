using Application.Commands;
using Application.DTOs;
using Application.Queries;
using Microsoft.AspNetCore.Mvc;

namespace REST.Controllers
{
    public class DoctorsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetDoctors()
        {
            return HandleResult(await Mediator.Send(new GetDoctorsQuery()));
        }
        [HttpPost]
        public async Task<IActionResult> CreateDoctor(DoctorDto doctor)
        {
            return HandleResult(await Mediator.Send(new CreateDoctorCommand(doctor)));
        }

    }
}
