using Domain.Base;

namespace Domain.Entities
{
    public class Department : BaseEntity
    {
        public string Name { get; set; }
        public int Employer_Count { get; set; }
        public string? Dept_Head { get; set; }
    }
}
