using Application.Core;
using Application.DTOs;
using Application.Validators;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public class ApplicationDIConfiguration
    {
        public static void Configure(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddScoped<IValidator<DoctorDto>, DoctorValidator>();
            services.AddScoped<IValidator<LabTestDto>, LabTestValidator>();
        }
    }
}
