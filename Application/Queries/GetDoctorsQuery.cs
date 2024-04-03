using Application.Core;
using Application.DTOs;
using MediatR;

namespace Application.Queries
{
    public record GetDoctorsQuery : IRequest<Result<IEnumerable<DoctorDto>>>
    {
    }
}
