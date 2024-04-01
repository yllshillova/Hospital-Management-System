

namespace Domain.Entities
{
    public class Department
    {

        public Guid Id { get; set; }
        public string Name { get; set; }

        public int Employer_Count { get; set; }

        public string? Dept_Head { get; set; }
    }
}
