using Application.Doctors;
using Application.DTOs;
using Application.Patients;
using AutoMapper;
using Domain.Entities;
using Application.Visits;


namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {
            CreateMap<Doctor,DoctorDto>().ReverseMap();
            CreateMap<Patient,PatientDto>().ReverseMap();
            CreateMap<Room,RoomDto>().ReverseMap();
            CreateMap<Visit, VisitDto>().ReverseMap();
        }
    }
}
