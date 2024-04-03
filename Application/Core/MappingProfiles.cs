using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Doctor, DoctorDto>().ReverseMap();
            CreateMap<Staff, StaffDto>().ReverseMap();
            CreateMap<Appointment, AppointmentDto>().ReverseMap();
        }
    }
}
