using Application.Base;
using Domain.Entities;

namespace Application.Departments
{
    public class DepartmentDto : BaseEntityDto
    {
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
        public IEnumerable<AppUser> Staff { get; set; }

    }
}
