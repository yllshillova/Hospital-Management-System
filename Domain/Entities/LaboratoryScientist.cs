namespace Domain.Entities
{
    public class LaboratoryScientist
    {
        public Guid Id { get; set; }
        public Guid DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
