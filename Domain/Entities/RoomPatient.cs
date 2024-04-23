using Domain.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class RoomPatient : IEntityBase
    {
        public Guid Id { get; set; }
        [ForeignKey("RoomId")]

        public Guid RoomId { get; set; }
        public Room Room { get; set; }

        [ForeignKey("RoomId")]
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set;}

    }
}
