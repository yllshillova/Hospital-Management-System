using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using static Application.Orders.Create;
using static Application.Orders.Details;
using static Application.Orders.Edit;
using static Application.Orders.List;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            return HandleResult(await Mediator.Send(new GetOrdersQuery()));
        }


        [HttpGet("{Id}")]
        public async Task<IActionResult> GetOrdertById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetOrderByIdQuery(Id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateContract([FromForm] OrderDto Order)
        {
            return HandleResult(await Mediator.Send(new CreateOrderCommand(Order)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditOrder(Guid Id, [FromForm] OrderDto Order)
        {
            Order.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateOrderCommand(Order)));
        }


    }
}
