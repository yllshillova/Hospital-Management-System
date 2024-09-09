using Application.Base;

namespace Application.Contracts
{
    public class OrderDto : BaseEntityDto
    {
        public DateTime Date { get; set; }
        public int QuantityOrdered { get; set; }
        public Guid ProductId { get; set; }

    }
}
