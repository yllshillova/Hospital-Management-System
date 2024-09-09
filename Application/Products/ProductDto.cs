using Application.Base;

namespace Application.Employees
{
    public class ProductDto : BaseEntityDto
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }

    }
}
