using Domain.Base;

namespace Domain.Entities
{
    public class Renovation : IEntityBase
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Description { get; set; }
        public double Cost { get; set; }
        public Building Building { get; set; }
        public Guid BuildingID { get; set; }

    }
}
