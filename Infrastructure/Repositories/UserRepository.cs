using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Repositories
{
    internal sealed class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(DataContext context, UserManager<AppUser> userManager, ILogger<UserRepository> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        public async Task<AppUser> GetUserByEmailAsync(string email)
        {
            return await _userManager.Users
                .FirstOrDefaultAsync(user => user.Email == email);
        }

        public bool IsEmailTaken(string email)
        {
            return _context.Users.Any(user => user.Email == email);
        }
        public bool IsUsernameTaken(string username)
        {
            return _context.Users.Any(user => user.UserName == username);
        }
        public async Task<bool> CreateUserAsync(AppUser user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                _logger.LogError(result.Errors.ToString());
                return false;
            }
            return true;
        }
        public async Task<bool> CreateUserWithRoleAsync<T>(T user, string password, string role) where T : AppUser
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var result = await _userManager.CreateAsync(user, password);
                if (!result.Succeeded)
                {
                    await transaction.RollbackAsync();
                    return false;
                }

                // Add user to role
                var addToRoleResult = await AddToRoleAsync(user, role);
                if (!addToRoleResult)
                {
                    await transaction.RollbackAsync();
                    return false;
                }

                if (user is Doctor)
                {
                    var doctor = user as Doctor;
                    var doctorEntity = new Doctor
                    {
                        Id = doctor.Id,
                        Specialization = doctor.Specialization,
                        DepartmentId = doctor.DepartmentId,
                    };
                }
                else if (user is Nurse)
                {
                    var nurse = user as Nurse;
                    var doctorEntity = new Nurse
                    {
                        Id = nurse.Id,
                        DepartmentId = nurse.DepartmentId,
                    };
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "An error occurred while creating the user with role.");
                return false;
            }
        }
        public async Task<bool> AddToRoleAsync(AppUser user, string role)
        {
            var result = await _userManager.AddToRoleAsync(user, role);
            if (result.Succeeded) return true;
            return false;
        }

        public async Task<bool> ValidatePasswordAsync(AppUser user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }
    }
}
