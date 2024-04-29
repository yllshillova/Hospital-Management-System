using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Infrastructure
{
    public class InfrastructureDIConfiguration
    {
        public async static void Configure(IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
                .AddRoles<IdentityRole<Guid>>()
                .AddEntityFrameworkStores<DataContext>();

            services.AddScoped<IDoctorRepository, DoctorRepository>();
            services.AddScoped<IVisitRepository, VisitRepository>();
            services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IAppointmentRepository, AppointmentRepository>();
            services.AddScoped<INurseRepository, NurseRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            services.AddScoped<IEmergencyContactRepository, EmergencyContactRepository>();
            services.AddScoped<IDepartmentRepository, DepartmentRepository>();
            services.AddScoped<ITokenRepository, TokenRepository>();
            services.AddScoped<IRoomPatientRepository, RoomPatientRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            await MigrateDatabaseAndSeedData(services.BuildServiceProvider());


        }

        private static async Task MigrateDatabaseAndSeedData(IServiceProvider services)
        {
            try
            {
                using var scope = services.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<DataContext>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
                await context.Database.MigrateAsync();
                await Seed.SeedData(context, roleManager);
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<InfrastructureDIConfiguration>>();
                logger.LogError(ex, "An error occurred during migration and data seeding");
            }
        }
    }
}
