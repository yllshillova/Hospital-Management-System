using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Contracts
{
    public class GetSatellitesByPlanet
    {
        public record GetContractsByEmployeeQuery(Guid EmployeeId) : IRequest<Result<IEnumerable<ContractDto>>>;

        public class GetScheduledAppointmentsQueryHandler(IContractRepository _contractRepository, IMapper _mapper) : IRequestHandler<GetContractsByEmployeeQuery, Result<IEnumerable<ContractDto>>>
        {
            public async Task<Result<IEnumerable<ContractDto>>> Handle(GetContractsByEmployeeQuery request, CancellationToken cancellationToken)
            {
                if (request.EmployeeId != Guid.Empty)
                {

                    var contracts = await _contractRepository.GetByEmployee(request.EmployeeId);
                    if (contracts == null || !contracts.Any()) return Result<IEnumerable<ContractDto>>.Failure(ErrorType.NotFound, "No contract records found for the employee");

                    var contractDtos = _mapper.Map<IEnumerable<ContractDto>>(contracts);
                    if (contractDtos is null) return Result<IEnumerable<ContractDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto");

                    return Result<IEnumerable<ContractDto>>.Success(contractDtos);
                }
                return Result<IEnumerable<ContractDto>>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
