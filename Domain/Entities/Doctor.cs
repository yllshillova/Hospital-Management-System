namespace Domain.Entities
{
    public class Doctor :AppUser
    {
        public Guid DepartmentId { get; set; }
        public Department Department { get; set; }
        public string Specialization { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}
