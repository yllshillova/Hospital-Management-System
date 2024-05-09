using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class AppointmentRepository : EntityBaseRepository<Appointment>, IAppointmentRepository
    {
        private readonly DataContext _context;

        public AppointmentRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByPatientId(Guid patientId)
        {
            var appointments = await _context.Appointments
                .Where(x => x.PatientId == patientId)
                .AsNoTracking()
                .ToListAsync();

            return appointments;
        }
        public async Task<IEnumerable<Appointment>> GetAppointmentsByDoctorId(Guid doctorId)
        {
            var appointments = await _context.Appointments
                .Where(x => x.DoctorId == doctorId)
                .AsNoTracking()
                .ToListAsync();

            return appointments;
        }
        //ekzistus     parameter  ekzistus    parameter
        //9         //10     //11          //12   
        public async Task<bool> IsValidAppointment(DateTime checkInDate, DateTime checkOutDate, Guid doctorId)
        {
            var appointments = await GetAppointmentsByDoctorId(doctorId);

            var unavailableAppointment = appointments.FirstOrDefault(appointment =>
                (checkInDate >= appointment.CheckInDate && checkInDate < appointment.CheckOutDate)
                || (checkOutDate > appointment.CheckInDate && checkOutDate <= appointment.CheckOutDate)
                );
            if (unavailableAppointment is null) return true;
            return false;
        }

        //public async Task<Appointment> GetIntersectingAppointment(Guid patientId, Guid doctorId)
        //{
        //    var patientAppointments = await GetAppointmentsByPatientId(patientId);
        //    var doctorAppointments = await GetAppointmentsByDoctorId(doctorId);

        //    foreach (var patientAppointment in patientAppointments)
        //    {
        //        foreach (var doctorAppointment in doctorAppointments)
        //        {
        //            if (AreAppointmentsIntersecting(patientAppointment, doctorAppointment))
        //            {
        //                return patientAppointment;
        //            }
        //        }
        //    }

        //    return null;
        //}

        //private bool AreAppointmentsIntersecting(Appointment patientAppointment, Appointment doctorAppointment)
        //{
        //    // Logic to check if appointments intersect
        //    return patientAppointment.CheckOutDate > doctorAppointment.CheckInDate &&
        //           doctorAppointment.CheckOutDate > patientAppointment.CheckInDate;
        //}

        public async Task<Appointment> GetIntersectingAppointment(Guid patientId, Guid doctorId)
        {
            // Retrieve appointments for the patient and doctor
            var patientAppointments = await GetAppointmentsByPatientId(patientId);
            var doctorAppointments = await GetAppointmentsByDoctorId(doctorId);

            // Find the intersecting appointment
            var intersectingAppointment = patientAppointments.FirstOrDefault(pa => doctorAppointments.Any(da => da.Id == pa.Id));

            return intersectingAppointment;
        }



    }
}
