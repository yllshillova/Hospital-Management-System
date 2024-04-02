using Application.DTOs;
using Application.Queries;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Handlers
{
    public class GetDoctorsQueryHandler(IDoctorRepository _doctorRepository,IMapper _mapper) : IRequestHandler<GetDoctorsQuery, IEnumerable<DoctorDto>>
    {
        public async Task<IEnumerable<DoctorDto>> Handle(GetDoctorsQuery request, CancellationToken cancellationToken)
        {
            var doctors = await _doctorRepository.GetAllAsync();
            var doctorDtos = _mapper.Map<IEnumerable<DoctorDto>>(doctors);
            return doctorDtos;
        }
    }
}
