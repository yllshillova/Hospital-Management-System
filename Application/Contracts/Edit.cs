using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Contracts
{
    public class Edit
    {
        public record UpdateContractCommand(ContractDto Contract) : IRequest<Result<Unit>>;

        public class UpdateContractCommandValidator : AbstractValidator<UpdateContractCommand>
        {
            public UpdateContractCommandValidator()
            {
                RuleFor(x => x.Contract).SetValidator(new ContractValidator());
            }
        }

        public class UpdateContractCommandHandler(IContractRepository _contractRepository, IMapper _mapper) : IRequestHandler<UpdateContractCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateContractCommand request, CancellationToken cancellationToken)
            {
                var contract = await _contractRepository.GetByIdAsync(request.Contract.Id);
                if (contract is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                _mapper.Map(request.Contract, contract);
                contract.UpdatedAt = DateTime.Now;

                var result = await _contractRepository.UpdateAsync(contract);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the contract. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
