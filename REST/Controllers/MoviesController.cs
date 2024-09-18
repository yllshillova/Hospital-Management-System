using Application.Movies;
using Microsoft.AspNetCore.Mvc;
using static Application.Movies.Create;
using static Application.Movies.Details;
using static Application.Movies.Edit;
using static Application.Movies.List;

namespace API.Controllers
{
    public class MoviesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            return HandleResult(await Mediator.Send(new GetMoviesQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetMovieById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetMovieByIdQuery(id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateMovie([FromForm] MovieDto Movie)
        {
            return HandleResult(await Mediator.Send(new CreateMovieCommand(Movie)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditMovie(Guid Id, [FromForm] MovieDto Movie)
        {
            Movie.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateMovieCommand(Movie)));
        }
    }
}
