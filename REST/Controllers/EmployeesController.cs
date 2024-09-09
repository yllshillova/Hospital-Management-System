using Application.Employees;
using Microsoft.AspNetCore.Mvc;
using static Application.Employees.Create;
using static Application.Employees.List;

namespace API.Controllers
{
    public class EmployeesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            return HandleResult(await Mediator.Send(new GetEmployeesQuery()));
        }



        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromForm] EmployeeDto Employee)
        {
            return HandleResult(await Mediator.Send(new CreateEmployeeCommand(Employee)));
        }


    }
}
