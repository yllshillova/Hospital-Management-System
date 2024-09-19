using Application.Accounts.Users;
using Application.Appointments;
using Application.Buildings;
using Application.Contracts;
using Application.Departments;
using Application.Doctors;
using Application.EmergencyContacts;
using Application.Employees;
using Application.Movies;
using Application.Nurses;
using Application.Patients;
using Application.Planets;
using Application.Renovations;
using Application.Rooms;
using Application.Satellites;
using Application.Sculptors;
using Application.Sculptures;
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
            CreateMap<Contract, ContractDto>().ReverseMap();
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Planet, PlanetDto>().ReverseMap();
            CreateMap<Satellite, SatelliteDto>().ReverseMap();
            CreateMap<Building, BuildingDto>().ReverseMap();
            CreateMap<Renovation, RenovationDto>().ReverseMap();
            CreateMap<Sculpture, SculptureDto>().ReverseMap();
            CreateMap<Sculptor, SculptorDto>().ReverseMap();
            CreateMap<Movie, MovieDto>().ReverseMap();
            CreateMap<Review, ReviewDto>().ReverseMap();


        }
    }
}
