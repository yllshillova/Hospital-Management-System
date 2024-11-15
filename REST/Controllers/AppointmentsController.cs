﻿using Application.Appointments;
using Microsoft.AspNetCore.Mvc;
using static Application.Appointments.Create;
using static Application.Appointments.Delete;
using static Application.Appointments.Details;
using static Application.Appointments.Edit;
using static Application.Appointments.GetLatestAppointments;
using static Application.Appointments.GetScheduledAppointments;
using static Application.Appointments.List;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : BaseApiController
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

        [HttpGet("Latest")]
        public async Task<IActionResult> GetLatestAppointments()
        {
            return HandleResult(await Mediator.Send(new GetLatestAppointmentsQuery()));
        }

        [HttpGet("Scheduled/{DoctorId}")]
        public async Task<IActionResult> GetScheduledAppointments(Guid DoctorId)
        {
            return HandleResult(await Mediator.Send(new GetScheduledAppointmentsQuery(DoctorId)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromForm] AppointmentDto Appointment)
        {
            return HandleResult(await Mediator.Send(new CreateAppointmentCommand(Appointment)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditAppointment(Guid Id, [FromForm] AppointmentDto Appointment)
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
