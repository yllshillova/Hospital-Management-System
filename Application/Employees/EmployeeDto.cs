using Application.Base;

namespace Application.Employees
{
    public class EmployeeDto : BaseEntityDto
    {
        public string FullName { get; set; }
        public bool IsActive { get; set; }

    }
}
