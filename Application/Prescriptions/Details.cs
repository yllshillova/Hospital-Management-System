using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using MediatR;

namespace Application.Prescriptions
{
    public class Details
    {
        public record GetPrescriptionByIdQuery(Guid Id) : IRequest<Result<PrescriptionDto>>;

        public class GetPrescriptionByIdQueryHandler(IPrescriptionRepository _prescriptionRepository, IMapper _mapper) : IRequestHandler<GetPrescriptionByIdQuery, Result<PrescriptionDto>>
        {
            public async Task<Result<PrescriptionDto>> Handle(GetPrescriptionByIdQuery request, CancellationToken cancellationToken)
            {
                var prescription = await _prescriptionRepository.GetByIdAsync(request.Id);
                if (prescription is null) return Result<PrescriptionDto>.Failure(ErrorType.NotFound, "No records could be found!");

                var prescriptionDto = _mapper.Map<PrescriptionDto>(prescription);
                if (prescriptionDto is null) return Result<PrescriptionDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<PrescriptionDto>.Success(prescriptionDto);
            }
        }
    }
}
