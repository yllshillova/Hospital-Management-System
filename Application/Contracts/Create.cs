using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Contracts
{
    public class Create
    {
        public record CreateContractCommand(ContractDto Contract) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateContractCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Contract).SetValidator(new ContractValidator());
            }
        }

        public class CreateContractCommandHandler(IContractRepository _contractRepository, IMapper _mapper) : IRequestHandler<CreateContractCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateContractCommand request, CancellationToken cancellationToken)
            {
                if (request.Contract is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var contract = _mapper.Map<Contract>(request.Contract);
                if (contract is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                contract.CreatedAt = DateTime.Now;
                contract.UpdatedAt = contract.CreatedAt;

                var result = await _contractRepository.CreateAsync(contract);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the contract! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
