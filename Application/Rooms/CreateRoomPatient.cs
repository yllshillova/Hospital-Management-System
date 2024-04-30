using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Rooms
{
    public class CreateRoomPatient
    {
        public record CreateRoomPatientCommand(RoomPatientDto RoomPatient) : IRequest<Result<Unit>>;
        
        public class CommandValidator : AbstractValidator<CreateRoomPatientCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.RoomPatient).SetValidator(new RoomPatientValidator());
            }
        }

        public class CreateRoomPatientCommandHandler(IRoomPatientRepository roomPatientRepository, IMapper mapper, DataContext _context) : IRequestHandler<CreateRoomPatientCommand, Result<Unit>>
        {
            
            //private readonly DataContext _context;
            //public CreateRoomPatientCommandHandler()
            //{

            //}
            public async Task<Result<Unit>> Handle(CreateRoomPatientCommand request, CancellationToken cancellationToken)
            {
                if (request.RoomPatient is null)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Invalid request.");

                bool roomPatientAlreadyExists = await _context.RoomPatients.Where(x=>x.PatientId == request.RoomPatient.PatientId).AnyAsync();

                if(roomPatientAlreadyExists)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Patient is already in another room.");

                int roomCapacity = await _context.Rooms.Where(x => x.Id == request.RoomPatient.RoomId).Select(x => x.Capacity).FirstOrDefaultAsync();
                int roomPatientCount = await _context.RoomPatients.Where(x => x.RoomId == request.RoomPatient.RoomId).CountAsync();
                
                if(roomPatientCount >= roomCapacity)
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Room reached its capacity!");


                var newRoomPatient = new RoomPatient
                {
                    RoomId = request.RoomPatient.RoomId,
                    PatientId = request.RoomPatient.PatientId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                };

                await _context.RoomPatients.AddAsync(newRoomPatient);
                var result = await _context.SaveChangesAsync();
                //dynamic roomPatient = null;
                //try
                //{

                //roomPatient = mapper.Map<RoomPatient>(request.RoomPatient);
                //}catch(Exception ex) { }
                //if (roomPatient is null)
                //    return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                // Mund të shtoni validime shtesë këtu nëse janë të nevojshme
                // Për shembull, kontrolloni nëse RoomId dhe PatientId janë valide, nëse dhoma dhe pacienti ekzistojnë etj.

                //var result = await roomPatientRepository.CreateAsync(roomPatient);
                //if (!result)
                //    return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to add patient to the room.");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}