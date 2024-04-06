﻿using Application.Departments;
using Application.Doctors;
using Application.DTOs;
using Application.Employers;
using Application.Prescriptions;
using Application.Patients;
using AutoMapper;
using Domain.Entities;


namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {
            CreateMap<Doctor,DoctorDto>().ReverseMap();
            CreateMap<Department,DepartmentDto>().ReverseMap();
            CreateMap<Patient,PatientDto>().ReverseMap();
            CreateMap<MedicalHistory,MedicalHistoryDto>().ReverseMap();
            CreateMap<Room,RoomDto>().ReverseMap();
            CreateMap<Staff,StaffDto>().ReverseMap();
            CreateMap<Prescription, PrescriptionDto>().ReverseMap();
        }
    }
}
