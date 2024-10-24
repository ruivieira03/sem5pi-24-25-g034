using System.Threading.Tasks;
using Hospital.Domain.Users;

namespace Hospital.Domain.Users
{
    public interface ISystemUserRepository
    {
        Task<SystemUser> GetUserByUsernameAsync(string username);
        Task<SystemUser> GetUserByEmailAsync(string email);
        Task AddUserAsync(SystemUser user);
        Task UpdateUserAsync(SystemUser user);

    }
}
