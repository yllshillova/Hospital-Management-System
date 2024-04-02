using Application.DTOs;
using MediatR;

namespace Application.Queries
{
    public class GetDoctorsQuery : IRequest<IEnumerable<DoctorDto>>
    {
    }
}
