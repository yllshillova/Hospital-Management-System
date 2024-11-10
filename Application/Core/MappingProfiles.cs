using Application.Accounts.Users;
using Application.Appointments;
using Application.Departments;
using Application.Doctors;
using Application.EmergencyContacts;
using Application.Nurses;
using Application.Patients;
using Application.Rooms;
using Application.Visits;
using AutoMapper;
using Domain.Entities;


namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Doctor, DoctorDto>().ReverseMap();
            CreateMap<Patient, PatientDto>().ReverseMap();
            CreateMap<Room, RoomDto>().ReverseMap();
            CreateMap<Visit, VisitDto>().ReverseMap();
            CreateMap<Department, DepartmentDto>().ReverseMap();
            CreateMap<Nurse, NurseDto>().ReverseMap();
            CreateMap<Appointment, AppointmentDto>().ReverseMap();
            CreateMap<EmergencyContact, EmergencyContactDto>().ReverseMap();
            CreateMap<AppUser, UserDto>().ReverseMap();
            CreateMap<AppUser, DoctorDto>().ReverseMap();
            CreateMap<AppUser, NurseDto>().ReverseMap();


        }
    }
}
