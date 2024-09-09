using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Contracts
{
    public class GetContractsByStartDate
    {
        public record GetContractsByStartDateQuery(DateTime StartTime) : IRequest<Result<IEnumerable<ContractDto>>>;

        public class GetGetContractsByStartDateHandler(IContractRepository _contractRepository, IMapper _mapper) : IRequestHandler<GetContractsByStartDateQuery, Result<IEnumerable<ContractDto>>>
        {
            public async Task<Result<IEnumerable<ContractDto>>> Handle(GetContractsByStartDateQuery request, CancellationToken cancellationToken)
            {
                if (request.StartTime != DateTime.MinValue)
                {
                    var contracts = await _contractRepository.GetByStartDate(request.StartTime);
                    if (contracts is null || !contracts.Any()) return Result<IEnumerable<ContractDto>>.Failure(ErrorType.NotFound, "No contract records found");

                    var contractDtos = _mapper.Map<IEnumerable<ContractDto>>(contracts);
                    if (contractDtos is null) return Result<IEnumerable<ContractDto>>.Failure(ErrorType.NotFound, "No contract records found");

                    return Result<IEnumerable<ContractDto>>.Success(contractDtos);
                }
                return Result<IEnumerable<ContractDto>>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
