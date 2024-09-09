using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Contracts
{
    public class List
    {
        public record GetContractsQuery : IRequest<Result<IEnumerable<ContractDto>>>;

        public class GetContractsQueryHandler(IContractRepository _contractRepository, IMapper _mapper) : IRequestHandler<GetContractsQuery, Result<IEnumerable<ContractDto>>>
        {
            public async Task<Result<IEnumerable<ContractDto>>> Handle(GetContractsQuery request, CancellationToken cancellationToken)
            {
                var contracts = await _contractRepository.GetAllAsync();
                if (contracts is null || !contracts.Any()) return Result<IEnumerable<ContractDto>>.Failure(ErrorType.NotFound, "No contract records found");

                var contractDtos = _mapper.Map<IEnumerable<ContractDto>>(contracts);
                if (contractDtos is null) return Result<IEnumerable<ContractDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<ContractDto>>.Success(contractDtos);
            }
        }

    }
}
