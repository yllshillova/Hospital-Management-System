using Application.Base;

namespace Application.Movies
{
    public class ReviewDto : BaseEntityDto
    {
        public string UserName { get; set; }
        public double Rating { get; set; }
        public Guid MovieId { get; set; }


    }
}
