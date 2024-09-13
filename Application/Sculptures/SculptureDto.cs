using Application.Base;

namespace Application.Sculptures
{
    public class SculptureDto : BaseEntityDto
    {
        public string Title { get; set; }
        public string Material { get; set; }

        public bool IsDeleted { get; set; }
        public Guid SculptorId { get; set; }

    }
}
