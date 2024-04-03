using Application.Core;
using MediatR;

namespace Application.Doctors
{
    public record GetDoctorsQuery : IRequest<Result<IEnumerable<DoctorDto>>>
    {
    }
}
