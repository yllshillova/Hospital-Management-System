using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Appointments
{
    public class Details
    {
        public record GetAppointmentByIdQuery(Guid Id) : IRequest<Result<AppointmentDto>>;

        public class GetAppointmentByIdQueryHandler(IAppointmentRepository _appointmentRepository, IMapper _mapper) : IRequestHandler<GetAppointmentByIdQuery, Result<AppointmentDto>>
        {
            public async Task<Result<AppointmentDto>> Handle(GetAppointmentByIdQuery request, CancellationToken cancellationToken)
            {
                var appointment = await _appointmentRepository.GetByIdAsync(request.Id);
                if (appointment is null) return Result<AppointmentDto>.Failure(ErrorType.NotFound, "No records could be found");

                var appointmentDto = _mapper.Map<AppointmentDto>(appointment);
                if (appointmentDto is null) return Result<AppointmentDto>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                return Result<AppointmentDto>.Success(appointmentDto);
            }
        }
    }
}
