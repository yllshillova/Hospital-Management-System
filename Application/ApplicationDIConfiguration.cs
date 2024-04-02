using Application.Core;
using Application.DTOs;
using Application.Handlers;
using Application.Validators;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public class ApplicationDIConfiguration
    {
        public static void Configure(IServiceCollection services)
        {
            services.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(GetDoctorsQueryHandler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddScoped<IValidator<DoctorDto>, DoctorValidator>();
        }
    }
}
