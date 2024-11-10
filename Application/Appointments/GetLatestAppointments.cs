using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Appointments
{
    public class GetLatestAppointments
    {
        public record GetLatestAppointmentsQuery : IRequest<Result<IEnumerable<AppointmentDto>>>;

        public class GetLatestAppointmentsQueryHandler(IAppointmentRepository _appointmentRepository, IMapper _mapper) :
            IRequestHandler<GetLatestAppointmentsQuery, Result<IEnumerable<AppointmentDto>>>
        {

            public async Task<Result<IEnumerable<AppointmentDto>>> Handle(GetLatestAppointmentsQuery request, CancellationToken cancellationToken)
            {
                var appointments = await _appointmentRepository.GetAllAsync();
                if (appointments == null || !appointments.Any()) return Result<IEnumerable<AppointmentDto>>.Failure(ErrorType.NotFound, "No appointments found.");

                var latestAppointments = appointments.OrderByDescending(a => a.UpdatedAt).Take(3);
                var appointmentDtos = _mapper.Map<IEnumerable<AppointmentDto>>(latestAppointments);

                return Result<IEnumerable<AppointmentDto>>.Success(appointmentDtos);
            }
        }
    }
}

