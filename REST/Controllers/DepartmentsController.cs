using Application.Departments;
using Microsoft.AspNetCore.Mvc;
using static Application.Departments.Create;
using static Application.Departments.Delete;
using static Application.Departments.Details;
using static Application.Departments.Edit;
using static Application.Departments.GetDepartmentsCount;
using static Application.Departments.List;

namespace API.Controllers
{
    public class DepartmentsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetDepartments()
        {
            return HandleResult(await Mediator.Send(new GetDepartmentsQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetDepartmentById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetDepartmentByIdQuery(Id)));
        }

        [HttpGet("Count")]
        public async Task<IActionResult> GetDepartmentsCount()
        {
            return HandleResult(await Mediator.Send(new GetVistsCountQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartment([FromForm] DepartmentDto Department)
        {
            return HandleResult(await Mediator.Send(new CreateDepartmentCommand(Department)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditDepartment(Guid Id, [FromForm] DepartmentDto Department)
        {
            Department.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateDepartmentCommand(Department)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteDepartment(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteDepartmentCommand(Id)));
        }
    }
}
