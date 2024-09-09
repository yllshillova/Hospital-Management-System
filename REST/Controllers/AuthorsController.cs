using Application.Authors;
using Microsoft.AspNetCore.Mvc;
using static Application.Authors.Create;
using static Application.Authors.List;

namespace API.Controllers
{
    public class AuthorsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAuthors()
        {
            return HandleResult(await Mediator.Send(new GetAuthorsQuery()));
        }



        [HttpPost]
        public async Task<IActionResult> CreateAuthor([FromForm] AuthorDto Author)
        {
            return HandleResult(await Mediator.Send(new CreateAuthorCommand(Author)));
        }


    }
}
