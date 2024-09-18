﻿using Domain.Contracts;
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
                opt.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@.-_";
            })
                .AddRoles<IdentityRole<Guid>>()
                .AddEntityFrameworkStores<DataContext>();

            services.AddSingleton<MongoContext>();
            services.AddScoped<IDoctorRepository, DoctorRepository>();
            services.AddScoped<IVisitRepository, VisitRepository>();
            services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IAppointmentRepository, AppointmentRepository>();
            services.AddScoped<INurseRepository, NurseRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            services.AddScoped<IEmergencyContactRepository, EmergencyContactRepository>();
            services.AddScoped<IDepartmentRepository, DepartmentRepository>();
            services.AddScoped<ITokenRepository, TokenRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IChatMessageRepository, ChatMessageRepository>();
            services.AddScoped<IContractRepository, ContractRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IPlanetRepository, PlanetRepository>();
            services.AddScoped<ISatelliteRepository, SatelliteRepository>();
            services.AddScoped<IRenovationRepository, RenovationRepository>();
            services.AddScoped<IBuildingRepository, BuildingRepository>();
            services.AddScoped<ISculptorRepository, SculptorRepository>();
            services.AddScoped<ISculptureRepository, SculptureRepository>();
            services.AddScoped<IMovieRepository, MovieRepository>();
            services.AddScoped<IReviewRepository, ReviewRepository>();


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
