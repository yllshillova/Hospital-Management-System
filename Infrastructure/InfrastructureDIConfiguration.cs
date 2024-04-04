using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public class InfrastructureDIConfiguration
    {
        public static void Configure(IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentityCore<Staff>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<DataContext>();
            //services.AddIdentityCore<Patient>(opt =>
            //{
            //    opt.Password.RequireNonAlphanumeric = false;
            //    opt.User.RequireUniqueEmail = true;
            //}).AddEntityFrameworkStores<DataContext>();

            services.AddScoped<IDoctorRepository, DoctorRepository>();
            services.AddScoped<IStaffRepository, StaffRepository>();
            services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
            services.AddScoped<ILabTestRepository, LabTestRepository>();
            services.AddScoped<ILaboratoryScientistRepository, LaboratoryScientistRepository>();
        }
    }
}
