using Application.Movies;
using Microsoft.AspNetCore.Mvc;
using static Application.Reviews.Create;
using static Application.Reviews.Delete;
using static Application.Reviews.List;

namespace API.Controllers
{
    public class ReviewsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetReviews()
        {
            return HandleResult(await Mediator.Send(new GetReviewsQuery()));
        }


        [HttpPost]
        public async Task<IActionResult> CreateReview([FromForm] ReviewDto Review)
        {
            return HandleResult(await Mediator.Send(new CreateReviewCommand(Review)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteReview(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteReviewCommand(Id)));
        }


    }
}
