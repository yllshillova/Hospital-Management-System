using Application.Employees;
using Microsoft.AspNetCore.Mvc;
using static Application.Products.Create;
using static Application.Products.List;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return HandleResult(await Mediator.Send(new GetProductsQuery()));
        }



        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] ProductDto Product)
        {
            return HandleResult(await Mediator.Send(new CreateProductCommand(Product)));
        }


    }
}
