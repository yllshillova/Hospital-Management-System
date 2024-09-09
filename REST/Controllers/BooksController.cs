using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using static Application.Books.Create;
using static Application.Books.Details;
using static Application.Books.Edit;
using static Application.Books.List;

namespace API.Controllers
{
    public class BooksController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            return HandleResult(await Mediator.Send(new GetBooksQuery()));
        }


        [HttpGet("{Id}")]
        public async Task<IActionResult> GetBookById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetBookByIdQuery(Id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateBook([FromForm] BookDto Book)
        {
            return HandleResult(await Mediator.Send(new CreateBookCommand(Book)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditBook(Guid Id, [FromForm] BookDto Book)
        {
            Book.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateBookCommand(Book)));
        }


    }
}
