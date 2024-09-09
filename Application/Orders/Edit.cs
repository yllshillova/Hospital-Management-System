using Application.Contracts;
using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Orders
{
    public class Edit
    {
        public record UpdateOrderCommand(OrderDto Order) : IRequest<Result<Unit>>
        {
            public object Book { get; internal set; }
        }

        public class UpdateOrderCommandValidator : AbstractValidator<UpdateOrderCommand>
        {
            public UpdateOrderCommandValidator()
            {
                RuleFor(x => x.Order).SetValidator(new OrderValidator());
            }
        }

        public class UpdateContractCommandHandler(IOrderRepository _orderRepository, IMapper _mapper) : IRequestHandler<UpdateOrderCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
            {
                var order = await _orderRepository.GetByIdAsync(request.Order.Id);
                if (order is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                _mapper.Map(request.Order, order);
                order.UpdatedAt = DateTime.Now;

                var result = await _orderRepository.UpdateAsync(order);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the order. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
