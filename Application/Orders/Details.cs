using Application.Contracts;
using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Orders
{
    public class Details
    {
        public record GetOrderByIdQuery(Guid Id) : IRequest<Result<OrderDto>>;

        public class GetOrderByIdQueryHandler(IOrderRepository _orderRepository, IMapper _mapper) : IRequestHandler<GetOrderByIdQuery, Result<OrderDto>>
        {
            public async Task<Result<OrderDto>> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var order = await _orderRepository.GetByIdAsync(request.Id);
                    if (order is null) return Result<OrderDto>.Failure(ErrorType.NotFound, "No records could be found!");

                    var orderDto = _mapper.Map<OrderDto>(order);
                    if (orderDto is null) return Result<OrderDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                    return Result<OrderDto>.Success(orderDto);
                }
                return Result<OrderDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
