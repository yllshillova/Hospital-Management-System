using Application.Contracts;
using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Orders
{
    public class Create
    {
        public record CreateOrderCommand(OrderDto Order) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateOrderCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Order).SetValidator(new OrderValidator());
            }
        }

        public class CreateOrderCommandHandler(IOrderRepository _orderRepository, IMapper _mapper) : IRequestHandler<CreateOrderCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
            {
                if (request.Order is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var order = _mapper.Map<Order>(request.Order);
                if (order is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                order.CreatedAt = DateTime.Now;
                order.UpdatedAt = order.CreatedAt;

                var result = await _orderRepository.CreateAsync(order);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the Order! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
