using Application.Appointments;
using Microsoft.AspNetCore.Mvc;
using static Application.Appointments.Create;
using static Application.Appointments.Delete;
using static Application.Appointments.Details;
using static Application.Appointments.Edit;
using static Application.Appointments.List;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAppointments()
        {
            return HandleResult(await Mediator.Send(new GetAppointmentsQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetAppointmentById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetAppointmentByIdQuery(Id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppointment(AppointmentDto Appointment)
        {
            return HandleResult(await Mediator.Send(new CreateAppointmentCommand(Appointment)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditAppointment(Guid Id, AppointmentDto Appointment)
        {
            Appointment.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateAppointmentCommand(Appointment)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteAppointment(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteAppointmentCommand(Id)));
        }
    }
}
