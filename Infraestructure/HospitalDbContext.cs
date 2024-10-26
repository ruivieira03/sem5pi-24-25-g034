using Microsoft.EntityFrameworkCore;
using Hospital.Domain.Users.SystemUser;
using Hospital.Infraestructure.Users;
using Hospital.Domain.Shared;

namespace Hospital.Infraestructure
{

    // SystemUsers seed: not using the IAMId private and not using the ContactInformation class: directly definining the Email and PhoneNumber
    public class HospitalDbContext : DbContext
    {
        public DbSet<SystemUser> SystemUsers { get; set; }

        public HospitalDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           // Apply configurations
            modelBuilder.ApplyConfiguration(new SystemUserEntityTypeConfiguration());


            base.OnModelCreating(modelBuilder);
        }

    }
}
