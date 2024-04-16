﻿using Application.Base;

namespace Application.Departments
{
    public class DepartmentDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string IsDeleted { get; set; }
    }
}
