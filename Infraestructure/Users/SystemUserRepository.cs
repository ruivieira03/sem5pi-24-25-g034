using Hospital.Domain.Users;
using Hospital.Infraestructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Hospital.Infraestructure;
using Hospital.Infraestructure.Shared;

namespace Hospital.Infraestructure.Users
{
   public class SystemUserRepository : BaseRepository<SystemUser, SystemUserId>, ISystemUserRepository
    {
    public SystemUserRepository(HospitalDbContext context) : base(context)
    {
    }

    public async Task<SystemUser> GetUserByUsernameAsync(string username)
    {
        return await _objs.FirstOrDefaultAsync(u => u.Username == username);
    }

    public async Task<SystemUser> GetUserByEmailAsync(string email)
    {
        return await _objs.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task AddUserAsync(SystemUser user)
    {
        await AddAsync(user); // Use the base method to add the user
        await SaveChangesAsync(); // Call SaveChangesAsync to persist changes
    }
    public async Task UpdateUserAsync(SystemUser user)
    {
        // Check if the user exists in the database
        var existingUser = await _context.SystemUsers.FindAsync(user.Id);
        if (existingUser == null)
        {
            throw new InvalidOperationException("User not found.");
        }

        // Update properties
        existingUser.Username = user.Username;
        existingUser.Role = user.Role;
        existingUser.Email = user.Email;
        existingUser.PhoneNumber = user.PhoneNumber;
        existingUser.Password = user.Password;
        //existingUser.PasswordHash = user.PasswordHash; #TODO: Implement password hashing
        existingUser.ResetToken = user.ResetToken;
        existingUser.TokenExpiry = user.TokenExpiry;

        // Mark the user as modified
        _context.SystemUsers.Update(existingUser);
        
        // Save changes to the database
        await _context.SaveChangesAsync();
    }
    }

}
