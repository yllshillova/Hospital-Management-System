using Application.Base;
using Domain.Entities;

namespace Application.DTOs
{
    public class LaboratoryScientistDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public Staff Staff { get; set; }
        public Guid StaffId { get; set; }
    }
}