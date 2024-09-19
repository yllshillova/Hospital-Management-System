using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Sculptures
{
    public class Delete
    {
        public record DeleteSculptureCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteSculptureCommandHandler(ISculptureRepository _SculptureRepository) : IRequestHandler<DeleteSculptureCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteSculptureCommand request, CancellationToken cancellationToken)
            {
                var Sculpture = await _SculptureRepository.GetByIdAsync(request.Id);
                if (Sculpture is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                Sculpture.IsDeleted = true;
                Sculpture.UpdatedAt = DateTime.Now;
                var result = await _SculptureRepository.UpdateAsync(Sculpture);

                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the Sculpture! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
