using Application.Base;

namespace Application.Appointments
{
    public class AppointmentDto : BaseEntityDto
    {
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }
        public string Notes { get; set; }
        public Guid DoctorId { get; set; }
        public Guid PatientId { get; set; }
    }
}