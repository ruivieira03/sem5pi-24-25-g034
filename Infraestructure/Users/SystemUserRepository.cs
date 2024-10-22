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

    public async Task AddUserAsync(SystemUser user)
    {
        await AddAsync(user); // Use the base method to add the user
        await SaveChangesAsync(); // Call SaveChangesAsync to persist changes
    }
}

}
