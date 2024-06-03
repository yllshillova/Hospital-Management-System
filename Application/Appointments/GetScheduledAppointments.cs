using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Appointments
{
    public class GetScheduledAppointments
    {
        public record GetScheduledAppointmentsQuery : IRequest<Result<IEnumerable<AppointmentDto>>>;

        public class GetScheduledAppointmentsQueryHandler(IAppointmentRepository _appointmentRepository, IMapper _mapper) :
            IRequestHandler<GetScheduledAppointmentsQuery, Result<IEnumerable<AppointmentDto>>>
        {
            public async Task<Result<IEnumerable<AppointmentDto>>> Handle(GetScheduledAppointmentsQuery request, CancellationToken cancellationToken)
            {
                var scheduledAppointments = await _appointmentRepository.GetScheduledAppointments();
                if (scheduledAppointments == null || !scheduledAppointments.Any()) return Result<IEnumerable<AppointmentDto>>.Failure(ErrorType.NotFound, "No scheduled appointments found.");

                var appointmentDtos = _mapper.Map<IEnumerable<AppointmentDto>>(scheduledAppointments);
                if (appointmentDtos is null) return Result<IEnumerable<AppointmentDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<AppointmentDto>>.Success(appointmentDtos);
            }
        }
    }
}
