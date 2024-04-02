using Application.DTOs;
using Application.Queries;
using Microsoft.AspNetCore.Mvc;

namespace REST.Controllers
{
    public class DoctorsController : BaseApiController
    {
        [HttpGet]
        public async Task<IEnumerable<DoctorDto>> GetDoctors()
        {
            return await Mediator.Send(new GetDoctorsQuery());
        }
    }
}
