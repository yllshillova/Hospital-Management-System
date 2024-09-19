using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using static Application.Contracts.Create;
using static Application.Contracts.Details;
using static Application.Contracts.Edit;
using static Application.Contracts.GetContractsByEmployee;
using static Application.Contracts.GetContractsByStartDate;
using static Application.Contracts.List;

namespace API.Controllers
{
    public class ContractsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetContracts()
        {
            return HandleResult(await Mediator.Send(new GetContractsQuery()));
        }



        [HttpGet("StartDate")]
        public async Task<IActionResult> GetContractsByStartDate([FromQuery] DateTime startDate)
        {
            return HandleResult(await Mediator.Send(new GetContractsByStartDateQuery(startDate)));
        }


        [HttpGet("Employee/{EmployeeId}")]
        public async Task<IActionResult> GetContractsByEmployee(Guid EmployeeId)
        {
            return HandleResult(await Mediator.Send(new GetContractsByEmployeeQuery(EmployeeId)));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetContractById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetContractByIdQuery(Id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateContract([FromForm] ContractDto Contract)
        {
            return HandleResult(await Mediator.Send(new CreateContractCommand(Contract)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditContract(Guid Id, [FromForm] ContractDto Contract)
        {
            Contract.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateContractCommand(Contract)));
        }


    }
}
