using Application.Core;
using Application.Employees;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Products
{
    public class Create
    {
        public record CreateProductCommand(ProductDto Product) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateProductCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Product).SetValidator(new ProductValidator());
            }
        }

        public class CreateProductCommandHandler(IProductRepository _productRepository, IMapper _mapper) : IRequestHandler<CreateProductCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
            {
                if (request.Product is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action. Try again.");

                var product = _mapper.Map<Product>(request.Product);
                if (product is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                product.CreatedAt = DateTime.Now;
                product.UpdatedAt = product.CreatedAt;

                var result = await _productRepository.CreateAsync(product);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the product! Try again.");

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
