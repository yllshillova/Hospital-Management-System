using Application.Base;

namespace Application.Contracts
{
    public class ContractDto : BaseEntityDto
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public Guid EmployeeId { get; set; }

    }
}
