using System.Threading.Tasks;
using Hospital.Domain.Shared;

namespace Hospital.Infraestructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly HospitalDbContext _context;

        public UnitOfWork(HospitalDbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}