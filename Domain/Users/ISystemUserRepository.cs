using System.Threading.Tasks;
using Hospital.Domain.Users;

namespace Hospital.Domain.Users
{
    public interface ISystemUserRepository
    {
        Task<SystemUser> GetUserByUsernameAsync(string username);
        Task AddUserAsync(SystemUser user);
    }
}
