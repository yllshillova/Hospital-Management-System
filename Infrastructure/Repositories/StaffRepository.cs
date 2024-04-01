﻿using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal class StaffRepository : EntityBaseRepository<Staff>, IStaffRepository
    {
        public StaffRepository(DataContext context) : base(context)
        {
        }
    }
}
