using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure
{
    internal static class Seed
    {
        public static async Task SeedData(DataContext context, RoleManager<IdentityRole<Guid>> roleManager)
        {
            // Seed roles
            if (!await roleManager.RoleExistsAsync("Administrator"))
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>("Administrator"));
            }

            if (!await roleManager.RoleExistsAsync("Doctor"))
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>("Doctor"));
            }

            if (!await roleManager.RoleExistsAsync("Nurse"))
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>("Nurse"));
            }

            await context.SaveChangesAsync();
        }
    }
}
