﻿using Application.Doctors;
using Application.Patients;
using Application.Rooms;
using AutoMapper;
using Domain.Entities;
using Application.Visits;
using Application.Departments;
using Application.Nurses;
using Application.EmergencyContacts;
using Application.Appointments;
using Application.Accounts.Users;


namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {
            CreateMap<Doctor,DoctorDto>().ReverseMap();
            CreateMap<Patient,PatientDto>().ReverseMap();
            CreateMap<Room,RoomDto>().ReverseMap();
            CreateMap<Visit, VisitDto>().ReverseMap();
            CreateMap<Department, DepartmentDto>().ReverseMap();
            CreateMap<Nurse, NurseDto>().ReverseMap();
            CreateMap<Appointment, AppointmentDto>().ReverseMap();
            CreateMap<EmergencyContact, EmergencyContactDto>().ReverseMap();
            CreateMap<AppUser, UserDto>().ReverseMap();
        }
    }
}
