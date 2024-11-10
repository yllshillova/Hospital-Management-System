using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result is null) return NotFound();
            if (result.IsSuccess && result.Value is not null) return Ok(result.Value);

            return result.ErrorType switch
            {
                ErrorType.Unauthorized when !string.IsNullOrEmpty(result.ErrorMessage) => Unauthorized(result.ErrorMessage),
                ErrorType.Unauthorized => Unauthorized(),
                ErrorType.NotFound when !string.IsNullOrEmpty(result.ErrorMessage) => NotFound(result.ErrorMessage),
                ErrorType.NotFound when !result.IsSuccess && result.Value is null => NotFound(),
                ErrorType.NotFound when result.IsSuccess && result.Value is null => NotFound(),
                ErrorType.BadRequest when !string.IsNullOrEmpty(result.ErrorMessage) => BadRequest(result.ErrorMessage),
                ErrorType.BadRequest when !result.IsSuccess => BadRequest(result.ErrorType.ToString()),
                _ => StatusCode(StatusCodes.Status500InternalServerError)
            };

        }

    }
}
