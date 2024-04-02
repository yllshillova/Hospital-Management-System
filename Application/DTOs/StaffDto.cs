﻿using Application.Base;

namespace Application.DTOs
{
    public class StaffDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Type { get; set; }
        public DateTime DateJoined { get; set; }
        public string Residence { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public Guid DepartmentId { get; set; }
    }
}