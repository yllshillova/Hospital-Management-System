using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Prescriptions
{
    public class List
    {
        public record GetPrescriptionsQuery : IRequest<Result<IEnumerable<PrescriptionDto>>>;

        public class GetPrescriptionsQueryHandler(IPrescriptionRepository _prescriptionRepository, IMapper _mapper) : IRequestHandler<GetPrescriptionsQuery, Result<IEnumerable<PrescriptionDto>>>
        {
            public async Task<Result<IEnumerable<PrescriptionDto>>> Handle(GetPrescriptionsQuery request, CancellationToken cancellationToken)
            {
                var prescriptions = await _prescriptionRepository.GetAllAsync();
                if (prescriptions is null || !prescriptions.Any()) return Result<IEnumerable<PrescriptionDto>>.Failure(ErrorType.NotFound, "No records could be found!");

                var prescriptionDtos = _mapper.Map<IEnumerable<PrescriptionDto>>(prescriptions);
                if (prescriptionDtos is null) return Result<IEnumerable<PrescriptionDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<PrescriptionDto>>.Success(prescriptionDtos);
            }
        }

    }
}
