using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Hospital.Domain.Users.SystemUser;

namespace Hospital.Infraestructure.Users{
    public class SystemUserRepository : ISystemUserRepository{
        private readonly HospitalDbContext _context;

        public SystemUserRepository(HospitalDbContext context){
            _context = context;
        }


        public async Task<SystemUser> GetByIdAsync(SystemUserId id){return await _context.SystemUsers.FirstOrDefaultAsync(user => user.Id == id);
        }



        public async Task<SystemUser> GetUserByUsernameAsync(string username){ return await _context.SystemUsers.FirstOrDefaultAsync(user => user.Username == username);
        }

  
        public async Task<SystemUser> GetUserByEmailAsync(string email){
            return await _context.SystemUsers.FirstOrDefaultAsync(user => user.Email == email);
        }

        public async Task AddUserAsync(SystemUser user){
            _context.SystemUsers.AddAsync(user);
        }

        
        public async Task UpdateUserAsync(SystemUser user){
            _context.SystemUsers.Update(user);
        }


        public async Task Remove(SystemUser user){
            _context.SystemUsers.Remove(user); // Direct removal using Entity Framework
        }

        
        public async Task<List<SystemUser>> GetAllAsync(){   // Gett all users from the database
     
            return await _context.SystemUsers.ToListAsync();
        }
    }
}
