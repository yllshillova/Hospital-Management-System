namespace Domain.Interfaces
{
    public interface IPerson
    {
        string Name { get; set; }
        string LastName { get; set; }
        string Residence { get; set; }
        string Address { get; set; }
        string Gender { get; set; }
        string Email { get; set; }
        string PhoneNumber { get; set; }
        DateTime? Birthday { get; set; }

    }
}
