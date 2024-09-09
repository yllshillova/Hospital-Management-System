using Domain.Base;

namespace Domain.Entities
{
    public class Order : IEntityBase
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime Date { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public int QuantityOrdered { get; set; }

    }
}
