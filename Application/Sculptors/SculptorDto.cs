using Application.Base;

namespace Application.Sculptors
{
    public class SculptorDto : BaseEntityDto
    {
        public string Name { get; set; }
        public int BirthYear { get; set; }
        public bool IsDeleted { get; set; }


    }
}
