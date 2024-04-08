namespace Domain.Entities
{
    public class Doctor :AppUser
    {
        public string Specialization { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}
