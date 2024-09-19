using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Contracts
{
    public class Details
    {
        public record GetContractByIdQuery(Guid Id) : IRequest<Result<ContractDto>>;

        public class GetContractByIdQueryHandler(IContractRepository _contractRepository, IMapper _mapper) : IRequestHandler<GetContractByIdQuery, Result<ContractDto>>
        {
            public async Task<Result<ContractDto>> Handle(GetContractByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var contract = await _contractRepository.GetByIdAsync(request.Id);
                    if (contract is null) return Result<ContractDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var contractDto = _mapper.Map<ContractDto>(contract);
                    if (contractDto is null) return Result<ContractDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<ContractDto>.Success(contractDto);
                }
                return Result<ContractDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
