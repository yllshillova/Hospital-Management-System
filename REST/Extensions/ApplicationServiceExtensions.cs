using Application;
using Infrastructure;

namespace REST.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Add services to the container.

            services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            ApplicationDIConfiguration.Configure(services);
            InfrastructureDIConfiguration.Configure(services, config);

            return services;
        }
    }
}
