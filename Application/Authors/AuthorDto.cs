using Application.Base;

namespace Application.Authors
{
    public class AuthorDto : BaseEntityDto
    {
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string Country { get; set; }

    }
}
