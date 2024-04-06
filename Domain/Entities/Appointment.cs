using Domain.Base;

namespace Domain.Entities
{
    public class Appointment : BaseEntity
    {
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }
        public string Notes { get; set; }
        public Guid DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }

        //public ICollection<Patient> Patients { get; set; }
        //public ICollection<Doctor> Doctors { get; set; }
    }
}
