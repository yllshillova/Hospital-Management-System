using Application.Departments;
using Microsoft.AspNetCore.Mvc;
using static Application.Departments.Create;
using static Application.Departments.Delete;
using static Application.Departments.Details;
using static Application.Departments.Edit;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartmentById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetDepartmentByIdQuery(id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartment(DepartmentDto Department)
        {
            return HandleResult(await Mediator.Send(new CreateDepartmentCommand(Department)));
        }

        [HttpPut]
        public async Task<IActionResult> EditDepartment(Guid Id, DepartmentDto Department)
        {
            Department.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateDepartmentCommand(Department)));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteDepartment(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteDepartmentCommand(Id)));
        }
    }
}
