using Application.Base;

namespace Application.Members
{
    public class MemberDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string Role { get; set; }

        public Guid GroupId { get; set; }

    }
}
