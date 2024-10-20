using Microsoft.EntityFrameworkCore;

namespace Hospital.Infraestructure
{
    public class HospitalDbContext : DbContext
    {
         // add db context ex.:
         // public DbSet<Product> Products { get; set; }
 

        public HospitalDbContext(DbContextOptions options) : base(options)
        {
          
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // apply configurations ex.:
            // modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
        }
    }
}
