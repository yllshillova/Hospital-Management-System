namespace Domain.Entities
{
    public class Doctor
    {
        public Guid Id { get; set; }
        public string Specialization { get; set; }
        public string Qualifications { get; set; }
        public Guid DepartmentId { get; set; }
        public Department Department { get; set; }
        
    }
}
