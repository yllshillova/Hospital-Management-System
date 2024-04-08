using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Appointments
{
    public class List
    {
        public record GetAppointmentsQuery : IRequest<Result<IEnumerable<AppointmentDto>>>;

        public class GetAppointmentsQueryHandler(IAppointmentRepository _appointmentRepository, IMapper _mapper) : IRequestHandler<GetAppointmentsQuery, Result<IEnumerable<AppointmentDto>>>
        {
            public async Task<Result<IEnumerable<AppointmentDto>>> Handle(GetAppointmentsQuery request, CancellationToken cancellationToken)
            {
                var appointments = await _appointmentRepository.GetAllAsync();
                if (appointments is null || !appointments.Any()) return Result<IEnumerable<AppointmentDto>>.Failure(ErrorType.NotFound, "No records could be found.");

                var appointmentDtos = _mapper.Map<IEnumerable<AppointmentDto>>(appointments);
                if (appointmentDtos is null) return Result<IEnumerable<AppointmentDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<AppointmentDto>>.Success(appointmentDtos);
            }
        }
    }
}
