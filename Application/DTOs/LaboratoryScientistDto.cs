using Application.Base;
using Domain.Entities;

namespace Application.DTOs
{
    public class LaboratoryScientistDto : BaseEntityDto
    {
        public Guid StaffId { get; set; }
    }
}