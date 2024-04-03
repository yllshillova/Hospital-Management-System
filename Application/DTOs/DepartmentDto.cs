using Application.Base;

namespace Application.DTOs
{
    public class DepartmentDto : BaseEntityDto
    {
        public string Name { get; set; }
        public int Employer_Count { get; set; }
        public string? Dept_Head { get; set; }
    }
}
