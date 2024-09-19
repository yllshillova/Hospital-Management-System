using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Satellites
{
    public class Delete
    {
        public record DeleteSatelliteCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteSatelliteCommandHandler(ISatelliteRepository _satelliteRepository) : IRequestHandler<DeleteSatelliteCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteSatelliteCommand request, CancellationToken cancellationToken)
            {
                var satellite = await _satelliteRepository.GetByIdAsync(request.Id);
                if (satellite is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found!");

                satellite.IsDeleted = true;
                satellite.UpdatedAt = DateTime.Now;
                var result = await _satelliteRepository.UpdateAsync(satellite);

                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the satellite! Try again.");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
