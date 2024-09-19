using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Contracts
{
    public class GetContractsByStartDate
    {
        public record GetContractsByStartDateQuery(DateTime StartDate) : IRequest<Result<IEnumerable<ContractDto>>>;

        public class GetGetContractsByStartDateHandler(IContractRepository _contractRepository, IMapper _mapper) : IRequestHandler<GetContractsByStartDateQuery, Result<IEnumerable<ContractDto>>>
        {
            public async Task<Result<IEnumerable<ContractDto>>> Handle(GetContractsByStartDateQuery request, CancellationToken cancellationToken)
            {
                var contracts = await _contractRepository.GetByStartDate(request.StartDate);
                Console.Write(request.StartDate);

                if (contracts == null || !contracts.Any())
                {
                    return Result<IEnumerable<ContractDto>>.Failure(ErrorType.NotFound, $"No contracts records found for the start date  '{request.StartDate}'.");
                }
                var contractDtos = _mapper.Map<IEnumerable<ContractDto>>(contracts);
                if (contractDtos is null) return Result<IEnumerable<ContractDto>>.Failure(ErrorType.NotFound, "No contract records found");

                return Result<IEnumerable<ContractDto>>.Success(contractDtos);
            }
        }
    }
}
