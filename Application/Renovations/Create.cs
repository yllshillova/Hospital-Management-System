﻿using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Renovations
{
    public class Create
    {
        public record CreateRenovationCommand(RenovationDto Renovation) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateRenovationCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Renovation).SetValidator(new RenovationValidator());
            }
        }

        public class CreateRenovationCommandHandler(IRenovationRepository _RenovationRepository, IMapper _mapper) : IRequestHandler<CreateRenovationCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateRenovationCommand request, CancellationToken cancellationToken)
            {
                if (request.Renovation is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var Renovation = _mapper.Map<Renovation>(request.Renovation);
                if (Renovation is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                Renovation.CreatedAt = DateTime.Now;
                Renovation.UpdatedAt = Renovation.CreatedAt;

                var result = await _RenovationRepository.CreateAsync(Renovation);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the Renovation! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
