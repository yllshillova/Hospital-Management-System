using Application.Base;

namespace Application.Contracts
{
    public class BookDto : BaseEntityDto
    {
        public string Genre { get; set; }
        public string Title { get; set; }
        public Guid AuthorId { get; set; }

    }
}
