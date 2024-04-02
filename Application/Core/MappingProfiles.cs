using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {
            CreateMap<Doctor,DoctorDto>().ReverseMap();
            CreateMap<Patient,PatientDto>().ReverseMap();
            CreateMap<MedicalHistory,MedicalHistoryDto>().ReverseMap();
            CreateMap<Room,RoomDto>().ReverseMap();
        }
    }
}
