using Application.Core;
using Application.Employees;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Products
{
    public class List
    {
        public record GetProductsQuery : IRequest<Result<IEnumerable<ProductDto>>>;

        public class GetProductsQueryHandler(IProductRepository _productRepository, IMapper _mapper) : IRequestHandler<GetProductsQuery, Result<IEnumerable<ProductDto>>>
        {
            public async Task<Result<IEnumerable<ProductDto>>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
            {
                var products = await _productRepository.GetAllAsync();
                if (products is null || !products.Any()) return Result<IEnumerable<ProductDto>>.Failure(ErrorType.NotFound, "No employee records found");

                var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products);
                if (productDtos is null) return Result<IEnumerable<ProductDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<ProductDto>>.Success(productDtos);
            }
        }

    }
}
